import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import "moment/dist/locale/ar-ly";
import { Grid, Stack, FormControl, InputLabel, MenuItem, Select, Radio, RadioGroup, FormControlLabel, Typography, FormLabel } from "@mui/material";
import Prayer from "./Prayer";
import availableCountries from "../db/availableCountries.js";
import Loading from "./Loading.jsx";

moment.locale("ar");

function MainContent() {
  const timeDifferenceRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(availableCountries[13]);
  const [availableCities, setAvailableCities] = useState(availableCountries[13].cities);
  const [selectedCity, setSelectedCity] = useState({
    arabicName: "غزة",
    englishName: "Gaza",
  });
  const [currentTime, setCurrentTime] = useState(moment().utc());
  const [timeZone, setTimeZone] = useState('القدس');
  const [timeDifference, setTimeDifference] = useState(null);
  const [prayers, setPrayers] = useState([
    { englishName: "Fajr", arabicName: "الفجر", status: null },
    { englishName: "Dhuhr", arabicName: "الظهر", status: null },
    { englishName: "Asr", arabicName: "العصر", status: null },
    { englishName: "Maghrib", arabicName: "المغرب", status: null },
    { englishName: "Isha", arabicName: "العشاء", status: null },
  ]);
  const [timing, setTiming] = useState("Greenwich");

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(moment().utc());          
    }, 60000);
    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    updatePrayerStatus();
  }, [currentTime]);

  useEffect(() => {
    getApiData();
  }, [selectedCity.englishName]);

  useEffect(() => {
    if(apiData) {
      calculateTimeDifference();
    }
  }, [apiData ,timing, timeZone]);  // Add the state that when changes, you want to recalculate the time difference
  

  useEffect(() => {
    if (apiData) {
      // only calculate time difference when apiData is available
      calculateTimeDifference();
      // const zoneEnglishName = zone.slice(zone.indexOf('/') + 1)
      if (selectedCountry.isoCode === "PS") {
        setTimeZone("القدس")
      } else {
        const zoneEnglishName = availableCountries.find(
          country => country.timeZone.international[0] === apiData?.meta?.timezone
          )
        const zoneArabicName = zoneEnglishName.timeZone.international[1]
        setTimeZone(zoneArabicName)
      }
    }
  }, [apiData]);

  const getApiData = async () => {
    let countryIsoCode = selectedCountry.isoCode;
    const cityEnglishName = selectedCity.englishName;
    if (["Gaza", "Bethlehem"].includes(cityEnglishName)) {
      countryIsoCode = "IL";
    }
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?country=${countryIsoCode}&city=${cityEnglishName}`
      );
      const data = await response.json();
      setApiData(data.data);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }       
  };

  const calculateTimeDifference = () => {    
    const apiTimestamp = apiData?.date?.timestamp;
    if (apiTimestamp) {
      const apiDateTime = new Date(apiTimestamp * 1000);
      const apiTimeHours = moment(apiDateTime).hours();      
      const utcTime = moment().utc().hours();
      const localTime = moment().hours();  

      switch (timing) {
        case "Local":
          timeDifferenceRef.current = 7 - apiTimeHours;
          break;
        case "Greenwich":
          timeDifferenceRef.current = (localTime - utcTime) - (apiTimeHours - 7);
          break;
        default:
          timeDifferenceRef.current = 0;
          break;
      }
      setTimeDifference(timeDifferenceRef.current);
      setCurrentTime(moment().utc().add(timeDifferenceRef.current, "hours"));
    }
  };

  function getPrayerTime(time) {
    const prayerTime = moment(time, "HH:mm");
    prayerTime.subtract(timeDifferenceRef.current, "hours");
    return prayerTime.format("HH:mm");
  }

  function getUtcPrayerTime(time) {
    const prayerTime = moment(time, "HH:mm");
    const apiTimestamp = apiData?.date?.timestamp;
    if (apiTimestamp) {
      const apiDateTime = new Date(apiTimestamp * 1000);
      const apiTimeHours = moment(apiDateTime).hours();      
      const utcTime = moment().utc().hours();
      const localTime = moment().hours();
      const UtcDifference = (localTime - utcTime) - (apiTimeHours - 7);
      prayerTime.subtract(UtcDifference, "hours");
    }
    // console.log("prayerTime:", prayerTime.format("HH:mm"));
    return prayerTime.format("HH:mm");
  }

  const calculateTimeInterval = (prayerTime) => {
    const currentTimeMoment = moment.utc().format("HH:mm");
    const prayerTimeMoment = getUtcPrayerTime(prayerTime);
    // console.log("currentTime:", moment().format("HH:mm"));
    // console.log("currentUtcTime:", currentTimeMoment);
    // console.log("prayerTime:", prayerTime);
    // console.log("getPrayerTime:", getPrayerTime(prayerTime));
    // console.log("getUtcPrayerTime:", prayerTimeMoment);

    // If the next prayer time is in the past, add 24 hours to get the next day's prayer time
    if (moment(prayerTimeMoment).isBefore(moment(currentTimeMoment))) {
      moment(prayerTimeMoment).add(1, "days");
    }
    const remainingDuration = moment.duration(
      moment(prayerTimeMoment, "HH:mm").diff(moment(currentTimeMoment, "HH:mm"))
    );
    // console.log("remainingDuration:", remainingDuration.asHours());
    // const remainingTime = moment.utc(remainingDuration.asMilliseconds()).format("HH:mm");
    // const hours = duration.hours();
    // const minutes = duration.minutes();
    // const seconds = duration.seconds();
    const remainingTime = remainingDuration.asMinutes();
    console.log("remainingTime:", remainingTime);
    const elapsedTime = remainingDuration.subtract(24, "hours").asMinutes();;
    console.log("elapsedTime:", elapsedTime);
    return {remainingTime, elapsedTime};
  };
  

  const getPrayerStatus = () => {
    let prev;
    let interval, elapsedTime, prayerTime, remainingTime;
    let foregoingPrayer, currentPrayer, upcomingPrayer;
    let minimalDuration = moment.duration(24 * 60 * 60 * 1000).asMinutes();;
    for (let i = 0; i < prayers.length; i++) {
      prayerTime = timeDifferenceRef.current === 0
      ? apiData?.timings?.[prayers[i].englishName]
      : getUtcPrayerTime(apiData?.timings?.[prayers[i].englishName]);
      
      // calculateTimeInterval(getPrayerTime(apiData?.timings?.[prayer.englishName])).remainingTime
      interval = calculateTimeInterval(apiData?.timings?.[prayers[i].englishName]);
      remainingTime = interval.remainingTime;
      elapsedTime = interval.elapsedTime;
      // console.log("remainingTime:", remainingTime);
      // console.log("elapsedTime:", elapsedTime);
      // console.log("calculateTimeInterval:", calculateTimeInterval(apiData?.timings?.[prayers[i].englishName]));
      // if (Math.abs(elapsedTime.asMinutes()) <= moment.duration(1, "minutes").asMinutes()) {
      //   foregoingPrayer = "";
      //   currentPrayer = prayers[i].englishName;
      //   upcomingPrayer = "";
      //   return {foregoingPrayer, currentPrayer, upcomingPrayer};
      // }      
      prev = (i === 0) ? prayers.length - 1 : i - 1;
      if (remainingTime > 0 && remainingTime <= minimalDuration) {
        minimalDuration = remainingTime;
        foregoingPrayer = prayers[prev].englishName;
        currentPrayer = "";
        upcomingPrayer = prayers[i].englishName;
      }
    }
    // console.log({foregoingPrayer, currentPrayer, upcomingPrayer});
    return {foregoingPrayer, currentPrayer, upcomingPrayer};
  };

  const updatePrayerStatus = () => {
    const status = getPrayerStatus();
    let result;
    setPrayers((prevPrayers) =>
      prevPrayers.map((prayer) => {
        if (prayer.englishName === status.currentPrayer) {
          return { ...prayer, status: "Current" };
        } else if (prayer.englishName === status.upcomingPrayer) {
          return { ...prayer, status: "Upcoming" };
        } else if (prayer.englishName === status.foregoingPrayer) {
          return { ...prayer, status: "Foregoing" };
        } else {
          return { ...prayer, status: null };
        }
      })
    );
  }

  const handleCountryChange = async (event) => {
    const selected = availableCountries.find(
      country => country.englishName === event.target.value
    );
    setSelectedCountry(selected);
    setAvailableCities(selected.cities);
    setSelectedCity(selected.cities[0]);
  };

  const handleCityChange = (event) => {
    const selected = availableCities.find(
      city => city.englishName === event.target.value
    );
    setSelectedCity(selected);
  };

  const handleChangeTimeZone = (event) => {
    setTiming(event.target.value);
  };

  return (
    <>
      {/* TOP ROW */}
      <Grid
        container
        alignItems="center"
        style={{
          textAlign: "center",
          margin: "50px auto",
          padding: "10px",
          maxWidth: "700px",
          border: "2px solid",
          borderRadius: "20px",
        }}
      >
        <Grid xs={6}>
          <h3>
            {timing === "Greenwich"
            ? currentTime.format("LLLL").slice(0, -5)
            : `${apiData.date.hijri.weekday.ar} ${apiData.date.hijri.day} ${apiData.date.hijri.month.ar} ${apiData.date.hijri.year}`}
          </h3>
          <h1>
            {selectedCity.arabicName === "غزة" ? (
              <>
                {selectedCity.arabicName} &#128151;
              </>
            ) : (
              selectedCity.arabicName
            )}
          </h1>          
        </Grid>

        <Grid xs={6}>
          <FormControl  style={{ display: 'flex', justifyContent:'center', alignItems:'center', fontFamily: "Marhey", fontWeight: 'bold'}}>
            {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Greenwich"
              name="radio-buttons-group"
              value={timing}
              onChange={event => handleChangeTimeZone(event)}
            >
              <FormControlLabel value="Zone" control={<Radio  />} label={`حسب توقيت ${timeZone}`}/>
              {/* <FormControlLabel value="Local" control={<Radio />} label={`حسب التوقيت المحلي` } /> */}
              <FormControlLabel value="Greenwich" control={<Radio />} label={`حسب توقيت غرينتش` } />
            </RadioGroup>
          </FormControl>
        </Grid>

      </Grid>
      {/*=== TOP ROW ===*/}

      {/* SELECT CITY */}
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        gap="20px"
        margin="40px"
      >
        <FormControl style={{ width: "25%", minWidth: "250px" }}>
          <InputLabel
            style={{ color: "white", fontSize: "24px" }}
            id="demo-simple-select-label">
            الدولة
          </InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCountry.englishName}
            label="----الدولة"
            onChange={event => handleCountryChange(event)}
          >
            {availableCountries.map(country => (
              <MenuItem key={country.isoCode} value={country.englishName}>
                {country.arabicName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ width: "25%", minWidth: "250px" }}>
          <InputLabel
            style={{ color: "white", fontSize: "24px" }}
            id="demo-simple-select-label">
            المدينة
          </InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity.englishName}
            label="----المدينة"
            onChange={handleCityChange}
          >
            {availableCities?.map((city, index) => (
              <MenuItem key={index} value={city.englishName}>
                {city.arabicName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {/*=== SELECT CITY ===*/}

      {/* PRAYERS CARDS */}
      {!apiData ? (
        <Loading />
      ) : (
        <Stack
          direction="row"
          justifyContent="center"
          flexWrap="wrap"
          style={{ textAlign: "center", margin: "70px 0", gap: "15px" }}
        >
          {prayers.map(prayer => (
            <Prayer
              key={prayer.englishName}
              image={"./assets/" + prayer.englishName.toLowerCase() + "-prayer.png"
              }
              name={prayer.arabicName}
              time={getPrayerTime(apiData?.timings?.[prayer.englishName])}
              timeInterval={
                timing === "Greenwich"
                  ? calculateTimeInterval(apiData?.timings?.[prayer.englishName])
                  : calculateTimeInterval(apiData?.timings?.[prayer.englishName])
              }
              status={
                prayer.status === "Current"
                  ? "حان وقت الصلاة"
                  : prayer.status === "Upcoming"
                  ? moment.duration(calculateTimeInterval(apiData?.timings?.[prayer.englishName]).remainingTime * 60 * 1000).humanize(true)
                  : prayer.status === "Foregoing"
                  ? moment.duration(calculateTimeInterval(apiData?.timings?.[prayer.englishName]).remainingTime * 60 * 1000).humanize(true)
                  : null
              }
              badge={
                prayer.status === "Current"
                  ? "neutral"
                  : prayer.status === "Upcoming"
                  ? "primary"
                  : prayer.status === "Foregoing"
                  ? "warning"
                  : null
            }
            />
          ))}
        </Stack>
      )}
      {/*=== PRAYERS CARDS ===*/}
    </>
  );
}
export default MainContent;

/*
==========================================
1. Create a custom useEffect hook:
==========================================

import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

==========================================
2. Use the custom useEffect hook in your component:
==========================================

import moment from 'moment';

function MyComponent() {
  const [currentTime, setCurrentTime] = useState(moment());

  useInterval(() => {
    setCurrentTime(moment());
  }, 60000 - currentTime.seconds() * 1000); // Update every minute change

  // ... rest of your component logic
}
*/

/*
import React, { useState, useEffect } from 'react';
import moment from 'moment';

function MyComponent() {
  const [time, setTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));

  useEffect(() => {
    const updateTime = () => {
      setTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    };

    const now = moment();
    const nextMinute = moment().add(1, 'minute');
    const duration = moment.duration(nextMinute.diff(now));
    const timeout = setTimeout(updateTime, duration.asMilliseconds());

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  return <div>{time}</div>;
}

export default MyComponent;
*/