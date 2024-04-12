import Grid from "@mui/material/Unstable_Grid2";
// import Divider from '@mui/material/Divider';
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import "moment/dist/locale/ar-dz";
import { useState, useEffect, useRef } from "react";
import availableCountries from "../db/availableCountries.js";
import Loading from "./Loading.jsx";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

moment.locale("ar");
export default function MainContent() {
  const timeDifferenceRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(
    availableCountries[13]
  );
  const [availableCities, setAvailableCities] = useState(
    availableCountries[13].cities
  );
  const [selectedCity, setSelectedCity] = useState({
    arabicName: "غزة",
    englishName: "Gaza",
  });
  const [currentTime, setCurrentTime] = useState(moment());
  const [timeZone, setTimeZone] = useState('القدس');
  const [timeDifference, setTimeDifference] = useState(null);
  const [prayers, setPrayers] = useState(
    [
      {englishName: "Fajr", arabicName: "الفجر", status: null},
      {englishName: "Dhuhr", arabicName: "الظهر", status: null},
      {englishName: "Asr", arabicName: "العصر", status: null},
      {englishName: "Maghrib", arabicName: "المغرب", status: null},
      {englishName: "Isha", arabicName: "العشاء", status: null},
    ]
  );
  const [timing, setTiming] = useState("Greenwich");

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(moment());          
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    updatePrayerStatus();
  }, [currentTime]);

  useEffect(() => {
    getApiData();
  }, [selectedCity.englishName]);

  useEffect(() => {
    console.log("timing:", timing);
    console.log("timeDifference:", timeDifference);
  }, [timeDifference]);

  useEffect(() => {
    if(apiData) {
      console.log("timing:", timing);
      calculateTimeDifference();
      console.log("timeDifference:", timeDifferenceRef.current);
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
    if (cityEnglishName === "Gaza" ||
      cityEnglishName === "Bethlehem") {
      countryIsoCode = "IL";
    }
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?method=8&country=${countryIsoCode}&city=${cityEnglishName}`
    );
    const data = await response.json();
    setApiData(data.data);        
  };

  const calculateTimeDifference = () => {    
    const apiTimestamp = apiData?.date?.timestamp;
    if (apiTimestamp) {
      const apiDateTime = new Date(apiTimestamp * 1000);
      const apiTimeHours = moment(apiDateTime).hours();      
      const utcTime = moment().utc().hours();
      const localTime = moment().hours();

      // console.log("timing", timing);
      // console.log("API", apiTimeHours);
      // console.log("Local", apiTimeHours - 7);
      // console.log("utcTime ", utcTime);
      // console.log("UTC", (apiTimeHours - 7) - (localTime - utcTime));
      // console.log("====================");

      switch (timing) {
        case "Zone":
          timeDifferenceRef.current = 0;
          break;
        case "Local":
          timeDifferenceRef.current = apiTimeHours - 7;
          break;
        default:
          timeDifferenceRef.current = (apiTimeHours - 7) - (localTime - utcTime);
          break;
      }
    }
  };

  function getPrayerTime(time) {
    const prayerTime = moment(time, "HH:mm");
    prayerTime.subtract(timeDifference, "hours");
    return prayerTime.format("HH:mm");
  }

  const calculateTimeInterval = (prayerTime) => {
    const currentTimeMoment = moment(currentTime, "HH:mm:ss");
    const prayerTimeMoment = moment(prayerTime, "HH:mm:ss");

    // If the next prayer time is in the past, add 24 hours to get the next day's prayer time
    if (prayerTimeMoment.isBefore(currentTimeMoment)) {
      prayerTimeMoment.add(1, "days");
    }
    const remainingDuration = moment.duration(
      prayerTimeMoment.diff(currentTimeMoment)
    );
    // const remainingTime = moment.utc(remainingDuration.asMilliseconds()).format("HH:mm");
    // const hours = duration.hours();
    // const minutes = duration.minutes();
    // const seconds = duration.seconds();
    const remainingTime = moment.duration(remainingDuration, "milliseconds");
    const elapsedTime = moment.duration(remainingDuration.subtract(24, "hours"), "milliseconds");
    return {remainingTime, elapsedTime};
  };

  const getPrayerStatus = () => {
    let prev;
    let elapsedTime, prayerTime, remainingTime;
    let foregoingPrayer, currentPrayer, upcomingPrayer;
    let minimalDuration = moment.duration(24 * 60 * 60 * 1000).asMinutes();
    for (let i = 0; i < prayers.length; i++) {
      prayerTime =  calculateTimeDifference === 0 ?
        getPrayerTime(apiData?.timings?.[prayers[i].englishName]) :
        getPrayerTime(apiData?.timings?.[prayers[i].englishName]);
      // calculateTimeInterval(getPrayerTime(apiData?.timings?.[prayer.englishName])).remainingTime
      remainingTime = calculateTimeInterval(prayerTime).remainingTime;
      elapsedTime = calculateTimeInterval(prayerTime).elapsedTime;
      // if (Math.abs(elapsedTime.asMinutes()) <= moment.duration(1, "minutes").asMinutes()) {
      //   foregoingPrayer = "";
      //   currentPrayer = prayers[i].englishName;
      //   upcomingPrayer = "";
      //   return {foregoingPrayer, currentPrayer, upcomingPrayer};
      // }      
      prev = (i === 0) ? prayers.length - 1 : i - 1;
      if (remainingTime.asMinutes() <= minimalDuration) {
        minimalDuration = remainingTime.asMinutes();
        foregoingPrayer = prayers[prev].englishName;
        currentPrayer = "";
        upcomingPrayer = prayers[i].englishName;
      }
    }
    return {foregoingPrayer, currentPrayer, upcomingPrayer};
  };

  const updatePrayerStatus = () => {
    const status = getPrayerStatus();
    let result;
    setPrayers(prevPrayers => {
      return prevPrayers.map(prayer => {
        if(prayer.englishName === status.currentPrayer) {
          result = {...prayer, status: "Current"}
        }
        else if(prayer.englishName === status.upcomingPrayer) {
          result = {...prayer, status: "Upcoming"}
        }
        else if(prayer.englishName === status.foregoingPrayer) {
          result = {...prayer, status: "Foregoing"}
        }
        else {
          result = {...prayer, status: null}
        }
        return result
      })
    })
  }

  const handleCountryChange = async (event) => {
    const selected = availableCountries.find(
      (country) => country.englishName === event.target.value
    );
    setSelectedCountry(selected);
    setAvailableCities(selected.cities);
    setSelectedCity(selected.cities[0]);
  };

  const handleCityChange = (event) => {
    const selected = availableCities.find(
      (city) => city.englishName === event.target.value
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
        {selectedCity.arabicName === 'غزة'?
          <h1>{selectedCity.arabicName} &#128151;</h1> :
          <h1>{selectedCity.arabicName}</h1>}
          <p>{`حسب توقيت ${timeZone}`}</p>
        </Grid>
        <Grid xs={6} style={{}}>
        <FormControl>
          {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Greenwich"
            name="radio-buttons-group"
            value={timing}
            onChange={(event) => handleChangeTimeZone(event)}
          >
            <FormControlLabel value="Zone" control={<Radio />} label={`حسب توقيت ${timeZone}`} />
            <FormControlLabel value="Local" control={<Radio />} label={`حسب التوقيت المحلي` } />
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
            id="demo-simple-select-label"
          >
            الدولة
          </InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCountry.englishName}
            label="----الدولة"
            onChange={handleCountryChange}
          >
            {availableCountries.map((country) => (
              <MenuItem key={country.isoCode} value={country.englishName}>
                {country.arabicName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ width: "25%", minWidth: "250px" }}>
          <InputLabel
            style={{ color: "white", fontSize: "24px" }}
            id="demo-simple-select-label"
          >
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
            {availableCities.map((city, index) => (
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
          justifyContent="space-around"
          flexWrap={"wrap"}
          style={{ textAlign: "center", margin: "70px 0", gap: "15px" }}
        >
          {prayers.map((prayer) => (
            <Prayer
              key={prayer.englishName}
              image={
                "../src/assets/" +
                prayer.englishName.toLowerCase() +
                "-prayer.png"
              }
              name={prayer.arabicName}
              time={getPrayerTime(apiData?.timings?.[prayer.englishName])}
              timeInterval={calculateTimeInterval(getPrayerTime(apiData?.timings?.[prayer.englishName]))}
              status={prayer.status === "Current" ?
                "حان وقت الصلاة" :
                prayer.status === "Upcoming" ? calculateTimeInterval(getPrayerTime(apiData?.timings?.[prayer.englishName])).remainingTime.humanize(true) :
                prayer.status === "Foregoing" ? calculateTimeInterval(getPrayerTime(apiData?.timings?.[prayer.englishName])).elapsedTime.humanize(true) :
                null
              }
            />
          ))}
        </Stack>
      )}
      {/*=== PRAYERS CARDS ===*/}
    </>
  );
}

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