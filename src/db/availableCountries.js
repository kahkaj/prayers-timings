const availableCountries = [
    {
        isoCode: "DZ",
        arabicName: "الجزائر",
        englishName: "Algeria",
        timeZone: {
            international: ["Africa/Algiers", "الجزائر"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "الجزائر", englishName: "Algiers" },
            { arabicName: "ورقلة", englishName: "Ouargla" },
            { arabicName: "وهران", englishName: "Oran" },
            { arabicName: "قسنطينة", englishName: "Constantine" },
            { arabicName: "قالمة", englishName: "Guelma" },
            { arabicName: "باتنة", englishName: "Batna" },
            { arabicName: "بجاية", englishName: "Bejaia" },
            { arabicName: "سطيف", englishName: "Setif" },
            { arabicName: "تلمسان", englishName: "Tlemcen" },
            { arabicName: "عنابة", englishName: "Annaba" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "BH",
        arabicName: "البحرين",
        englishName: "Bahrain",
        timeZone: {
            international: ["Asia/Bahrain", "المنامة"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "المنامة", englishName: "Manama" },
            { arabicName: "المحرق", englishName: "Muharraq" },
            { arabicName: "الرفاع", englishName: "Riffa" },
            { arabicName: "حمد", englishName: "Hamad Town" },
            { arabicName: "عيسى", englishName: "Isa Town" },
            { arabicName: "سترة", englishName: "Sitrah" },
            { arabicName: "جد حفص", englishName: "Jidhafs" },
            { arabicName: "الحد", englishName: "Al Hidd" },
            { arabicName: "مدينة عيسى", englishName: "Isa Town" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "KM",
        arabicName: "جزر القمر",
        englishName: "Comoros",
        timeZone: {
            international: ["Indian/Comoro", "جزر القمر"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "موروني", englishName: "Moroni" },
            { arabicName: "أنجوان", englishName: "Anjouan" },
            { arabicName: "موهيلي", englishName: "Moheli" },
            { arabicName: "غراند كومور", englishName: "Grand Comore" }
            // Add more cities if needed
        ]
    },
    {
        isoCode: "DJ",
        arabicName: "جيبوتي",
        englishName: "Djibouti",
        timeZone: {
            international: ["Africa/Djibouti", "جيبوتي"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "جيبوتي", englishName: "Djibouti City" },
            { arabicName: "علي سبيه", englishName: "Ali Sabieh" },
            { arabicName: "دخيل", englishName: "Dikhil" },
            { arabicName: "أوبوك", englishName: "Obock" },
            { arabicName: "تادجورة", englishName: "Tadjoura" }
            // Add more cities if needed
        ]
    },
    {
        isoCode: "EG",
        arabicName: "مصر",
        englishName: "Egypt",
        timeZone: {
            international: ["Africa/Cairo", "القاهرة"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "القاهرة", englishName: "Cairo" },
            { arabicName: "الإسكندرية", englishName: "Alexandria" },
            { arabicName: "الجيزة", englishName: "Giza" },
            { arabicName: "المنصورة", englishName: "Mansoura" },
            { arabicName: "الإسماعيلية", englishName: "Ismailia" },
            { arabicName: "الفيوم", englishName: "Faiyum" },
            { arabicName: "بنها", englishName: "Banha" },
            { arabicName: "طنطا", englishName: "Tanta" },
            { arabicName: "أسيوط", englishName: "Assiut" },
            { arabicName: "المنيا", englishName: "Minya" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "IQ",
        arabicName: "العراق",
        englishName: "Iraq",
        timeZone: {
            international: ["Asia/Baghdad", "بغداد"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "بغداد", englishName: "Baghdad" },
            { arabicName: "البصرة", englishName: "Basra" },
            { arabicName: "الموصل", englishName: "Mosul" },
            { arabicName: "كركوك", englishName: "Kirkuk" },
            { arabicName: "النجف", englishName: "Najaf" },
            { arabicName: "السليمانية", englishName: "Sulaymaniyah" },
            { arabicName: "ديالى", englishName: "Diyala" },
            { arabicName: "الأنبار", englishName: "Al-Anbar" },
            { arabicName: "كربلاء", englishName: "Karbala" },
            { arabicName: "المدينة", englishName: "Al-Medina" } // Corrected city name
            // Add more cities as needed
        ]
    },
    {
        isoCode: "JO",
        arabicName: "الأردن",
        englishName: "Jordan",
        timeZone: {
            international: ["Asia/Amman", "عمان"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "عمان", englishName: "Amman" },
            { arabicName: "الزرقاء", englishName: "Zarqa" },
            { arabicName: "إربد", englishName: "Irbid" },
            { arabicName: "السلط", englishName: "Salt" },
            { arabicName: "العقبة", englishName: "Aqaba" },
            { arabicName: "معان", englishName: "Ma'an" },
            { arabicName: "الرمثا", englishName: "Ramtha" },
            { arabicName: "المفرق", englishName: "Mafraq" },
            { arabicName: "الطفيلة", englishName: "Tafilah" },
            { arabicName: "الكرك", englishName: "Karak" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "KW",
        arabicName: "الكويت",
        englishName: "Kuwait",
        timeZone: {
            international: ["Asia/Kuwait", "الكويت"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "الكويت", englishName: "Kuwait City" },
            { arabicName: "الفروانية", englishName: "Al Farwaniyah" },
            { arabicName: "حولي", englishName: "Hawalli" },
            { arabicName: "الأحمدي", englishName: "Al Ahmadi" },
            { arabicName: "الجهراء", englishName: "Al Jahra" },
            { arabicName: "مبارك الكبير", englishName: "Mubarak Al-Kabeer" },
            { arabicName: "الفحيحيل", englishName: "Fahaheel" },
            { arabicName: "جليب الشيوخ", englishName: "Jeleeb Al-Shuyoukh" },
            { arabicName: "العارضية", englishName: "Al-Ardiya" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "LB",
        arabicName: "لبنان",
        englishName: "Lebanon",
        timeZone: {
            international: ["Asia/Beirut", "بيروت"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "بيروت", englishName: "Beirut" },
            { arabicName: "طرابلس", englishName: "Tripoli" },
            { arabicName: "صيدا", englishName: "Sidon" },
            { arabicName: "زحلة", englishName: "Zahle" },
            { arabicName: "جبيل", englishName: "Byblos" },
            { arabicName: "نبطية", englishName: "Nabatieh" },
            { arabicName: "بعلبك", englishName: "Baalbek" },
            { arabicName: "جزين", englishName: "Jezzine" },
            { arabicName: "عكار", englishName: "Akkar" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "LY",
        arabicName: "ليبيا",
        englishName: "Libya",
        timeZone: {
            international: ["Africa/Tripoli", "طرابلس"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "طرابلس", englishName: "Tripoli" },
            { arabicName: "بنغازي", englishName: "Benghazi" },
            { arabicName: "مصراتة", englishName: "Misrata" },
            { arabicName: "الزاوية", englishName: "Zawiya" },
            { arabicName: "زليتن", englishName: "Zliten" },
            { arabicName: "سرت", englishName: "Sirte" },
            { arabicName: "المرج", englishName: "Al-Marj" },
            { arabicName: "طبرق", englishName: "Tobruk" },
            { arabicName: "درنة", englishName: "Derna" },
            { arabicName: "البيضاء", englishName: "Al Bayda" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "MR",
        arabicName: "موريتانيا",
        englishName: "Mauritania",
        timeZone: {
            international: ["Africa/Nouakchott", "نواكشوط"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "نواكشوط", englishName: "Nouakchott" },
            { arabicName: "نواذيبو", englishName: "Nouadhibou" },
            { arabicName: "كيفه", englishName: "Kiffa" },
            { arabicName: "روصو", englishName: "Rosso" },
            { arabicName: "أطار", englishName: "Atar" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "MA",
        arabicName: "المغرب",
        englishName: "Morocco",
        timeZone: {
            international: ["Africa/Casablanca", "الدار البيضاء"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "الرباط", englishName: "Rabat" },
            { arabicName: "الدار البيضاء", englishName: "Casablanca" },
            { arabicName: "فاس", englishName: "Fez" },
            { arabicName: "مراكش", englishName: "Marrakesh" },
            { arabicName: "طنجة", englishName: "Tangier" },
            { arabicName: "أكادير", englishName: "Agadir" },
            { arabicName: "مكناس", englishName: "Meknes" },
            { arabicName: "وجدة", englishName: "Oujda" },
            { arabicName: "الحسيمة", englishName: "Al Hoceima" },
            { arabicName: "الجديدة", englishName: "El Jadida" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "OM",
        arabicName: "عمان",
        englishName: "Oman",
        timeZone: {
            international: ["Asia/Muscat", "مسقط"],
            gmt: "+03:00"
        },
        cities: [
            { arabicName: "مسقط", englishName: "Muscat" },
            { arabicName: "صلالة", englishName: "Salalah" },
            { arabicName: "صحار", englishName: "Sohar" },
            { arabicName: "السيب", englishName: "Seeb" },
            { arabicName: "نزوى", englishName: "Nizwa" },
            { arabicName: "صور", englishName: "Sur" },
            { arabicName: "البريمي", englishName: "Al Buraimi" },
            { arabicName: "إبراء", englishName: "Ibri" },
            { arabicName: "بهلاء", englishName: "Bahla" },
            { arabicName: "كبر", englishName: "Khaburah" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "PS",
        arabicName: "فلسطين",
        englishName: "Palestine",
        timeZone: {
            international: ["Asia/Gaza", "القدس"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "القدس", englishName: "Al Quds" },
            { arabicName: "غزة", englishName: "Gaza" },
            { arabicName: "رام الله", englishName: "Ramallah" },
            { arabicName: "نابلس", englishName: "Nablus" },
            { arabicName: "بيت لحم", englishName: "Bethlehem" },
            { arabicName: "خان يونس", englishName: "Khan Yunis" },
            { arabicName: "جنين", englishName: "Jenin" },
            { arabicName: "طولكرم", englishName: "Tulkarm" },
            { arabicName: "دير البلح", englishName: "Deir al-Balah" },
            { arabicName: "رفح", englishName: "Rafah" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "QA",
        arabicName: "قطر",
        englishName: "Qatar",
        timeZone: {
            international: ["Asia/Qatar", "الدوحة"],
            gmt: "+03:00"
        },
        cities: [
            { arabicName: "الدوحة", englishName: "Doha" },
            { arabicName: "الوكرة", englishName: "Al Wakrah" },
            { arabicName: "الخور", englishName: "Al Khor" },
            { arabicName: "الريان", englishName: "Ar Rayyan" },
            { arabicName: "الشمال", englishName: "Ash Shamal" },
            { arabicName: "أم صلال", englishName: "Umm Salal" },
            { arabicName: "دخان", englishName: "Dukhan" },
            { arabicName: "الزبارة", englishName: "Al Zubara" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "SA",
        arabicName: "المملكة العربية السعودية",
        englishName: "Saudi Arabia",
        timeZone: {
            international: ["Asia/Riyadh", "الرياض"],
            gmt: "+03:00"
        },
        cities: [
            { arabicName: "الرياض", englishName: "Riyadh" },
            { arabicName: "جدة", englishName: "Jeddah" },
            { arabicName: "مكة المكرمة", englishName: "Mecca" },
            { arabicName: "المدينة المنورة", englishName: "Medina" },
            { arabicName: "الدمام", englishName: "Dammam" },
            { arabicName: "بريدة", englishName: "Buraidah" },
            { arabicName: "تبوك", englishName: "Tabuk" },
            { arabicName: "خميس مشيط", englishName: "Khamis Mushait" },
            { arabicName: "الطائف", englishName: "Taif" },
            { arabicName: "حائل", englishName: "Hail" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "SO",
        arabicName: "الصومال",
        englishName: "Somalia",
        timeZone: {
            international: ["Africa/Mogadishu", "مقديشو"],
            gmt: "+03:00"
        },
        cities: [
            { arabicName: "مقديشو", englishName: "Mogadishu" },
            { arabicName: "بوساسو", englishName: "Bosaso" },
            { arabicName: "بيدا", englishName: "Beledweyne" },
            { arabicName: "بوراويو", englishName: "Borama" },
            { arabicName: "جوهر", englishName: "Giohar" },
            { arabicName: "قرن", englishName: "Garoowe" },
            { arabicName: "قالقيل", englishName: "Galcaio" },
            { arabicName: "دين", englishName: "Dhuusa Mareeb" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "SD",
        arabicName: "السودان",
        englishName: "Sudan",
        timeZone: {
            international: ["Africa/Khartoum", "الخرطوم"],
            gmt: "+03:00"
        },
        cities: [
            { arabicName: "الخرطوم", englishName: "Khartoum" },
            { arabicName: "أم درمان", englishName: "Omdurman" },
            { arabicName: "بورتسودان", englishName: "Port Sudan" },
            { arabicName: "الأبيض", englishName: "Al-Ubayyid" },
            { arabicName: "كسلا", englishName: "Kassala" },
            { arabicName: "الجُبّة", englishName: "Al Jubbah" },
            { arabicName: "الفاشر", englishName: "El Fasher" },
            { arabicName: "وادي حلفا", englishName: "Wadi Halfa" },
            { arabicName: "الدمازين", englishName: "Damazin" },
            { arabicName: "غيطي", englishName: "Gedaref" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "SY",
        arabicName: "سوريا",
        englishName: "Syria",
        timeZone: {
            international: ["Asia/Damascus", "دمشق"],
            gmt: "+02:00"
        },
        cities: [
            { arabicName: "دمشق", englishName: "Damascus" },
            { arabicName: "حلب", englishName: "Aleppo" },
            { arabicName: "حمص", englishName: "Homs" },
            { arabicName: "حماة", englishName: "Hama" },
            { arabicName: "اللاذقية", englishName: "Latakia" },
            { arabicName: "دير الزور", englishName: "Deir ez-Zor" },
            { arabicName: "الرقة", englishName: "Raqqa" },
            { arabicName: "إدلب", englishName: "Idlib" },
            { arabicName: "الحسكة", englishName: "Al-Hasakah" },
            { arabicName: "طرطوس", englishName: "Tartus" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "TN",
        arabicName: "تونس",
        englishName: "Tunisia",
        timeZone: {
            international: ["Africa/Tunis", "تونس"],
            gmt: "+01:00"
        },
        cities: [
            { arabicName: "تونس", englishName: "Tunis" },
            { arabicName: "صفاقس", englishName: "Sfax" },
            { arabicName: "سوسة", englishName: "Sousse" },
            { arabicName: "قفصة", englishName: "Gafsa" },
            { arabicName: "القيروان", englishName: "Kairouan" },
            { arabicName: "بنزرت", englishName: "Bizerte" },
            { arabicName: "نابل", englishName: "Nabeul" },
            { arabicName: "مدنين", englishName: "Medenine" },
            { arabicName: "تطاوين", englishName: "Tataouine" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "AE",
        arabicName: "الإمارات العربية المتحدة",
        englishName: "United Arab Emirates",
        timeZone: {
            international: ["Asia/Dubai", "دبي"],
            gmt: "+04:00"
        },
        cities: [
            { arabicName: "أبوظبي", englishName: "Abu Dhabi" },
            { arabicName: "دبي", englishName: "Dubai" },
            { arabicName: "الشارقة", englishName: "Sharjah" },
            { arabicName: "عجمان", englishName: "Ajman" },
            { arabicName: "أم القيوين", englishName: "Umm Al Quwain" },
            { arabicName: "رأس الخيمة", englishName: "Ras Al Khaimah" },
            { arabicName: "الفجيرة", englishName: "Fujairah" },
            { arabicName: "خورفكان", englishName: "Khorfakkan" },
            { arabicName: "دبا الحصن", englishName: "Dibba Al-Hisn" },
            { arabicName: "العين", englishName: "Al Ain" }
            // Add more cities as needed
        ]
    },
    {
        isoCode: "YE",
        arabicName: "اليمن",
        englishName: "Yemen",
        timeZone: {
            international: ["Asia/Aden", "عدن"],
            gmt: "+03:00"
        },
        cities: [
            { arabicName: "صنعاء", englishName: "Sana'a" },
            { arabicName: "عدن", englishName: "Aden" },
            { arabicName: "تعز", englishName: "Ta'izz" },
            { arabicName: "الحديدة", englishName: "Al Hudaydah" },
            { arabicName: "المكلا", englishName: "Al Mukalla" },
            { arabicName: "إب", englishName: "Ibb" },
            { arabicName: "ذمار", englishName: "Dhamar" },
            { arabicName: "عمران", englishName: "Amran" },
            { arabicName: "البيضاء", englishName: "Al Bayda" },
            { arabicName: "سيئون", englishName: "Say'un" }
            // Add more cities as needed
        ]
    }
]

export default availableCountries