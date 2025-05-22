// Import and export the Palestine data
const palestineData = {
  crimeJusticeStatisticsPalestine: [
    {
      indicator_ar: "الأفعال الإجرامية المبلغ عنها",
      indicator_en: "Reported Criminal Acts",
      "1996": 6571, "1997": 7826, "1998": 13397, "1999": 12212, "2000": 9761, "2001": 8257, "2002": 5055, "2003": 8202, "2004": 11127, "2005": 13705, "2006": null, "2007": null, "2008": 16220, "2009": 16402, "2010": 17779, "2011": 16790, "2012": 18330, "2013": 25225, "2014": 26356, "2015": 27522, "2016": 29960, "2017": 32647, "2018": 33579, "2019": 32267, "2020": 26241, "2021": 37037, "2022": 34391, "2023": 31365
    },
    {
      indicator_ar: "الأفعال الإجرامية المبلغ عنها لكل 1000 من السكان",
      indicator_en: "Reported Criminal Acts per 1000 Population",
      "1996": null, "1997": null, "1998": null, "1999": null, "2000": null, "2001": null, "2002": null, "2003": null, "2004": null, "2005": null, "2006": null, "2007": null, "2008": 7, "2009": 7, "2010": 8, "2011": 7.4, "2012": 8, "2013": 11, "2014": 10, "2015": 11, "2016": 11, "2017": 13, "2018": 13, "2019": 12, "2020": 10, "2021": 13, "2022": 12, "2023": 11
    },
    {
      indicator_ar: "جرائم المخدرات المبلغ عنها",
      indicator_en: "Reported Drug Crimes",
      "1996": 74, "1997": 305, "1998": 385, "1999": 81, "2000": 264, "2001": 139, "2002": 64, "2003": 167, "2004": 316, "2005": 439, "2006": null, "2007": null, "2008": 585, "2009": 611, "2010": 587, "2011": 593, "2012": 582, "2013": 818, "2014": 1044, "2015": 1345, "2016": 1529, "2017": 1444, "2018": 2207, "2019": 2014, "2020": 1719, "2021": 2611, "2022": 1592, "2023": 1996
    },
    {
      indicator_ar: "جرائم القتل والشروع في القتل المبلغ عنها",
      indicator_en: "Reported Homicide and Attempted Homicide",
      "1996": 86, "1997": 91, "1998": 140, "1999": 148, "2000": 169, "2001": 155, "2002": 164, "2003": 231, "2004": 238, "2005": 308, "2006": null, "2007": null, "2008": 229, "2009": 206, "2010": 82, "2011": 144, "2012": 157, "2013": 162, "2014": 208, "2015": 331, "2016": 258, "2017": 339, "2018": 319, "2019": 298, "2020": 288, "2021": 395, "2022": 435, "2023": 403
    },
    {
      indicator_ar: "جرائم السرقة المبلغ عنها",
      indicator_en: "Reported Theft Crimes",
      "1996": 1363, "1997": 2098, "1998": 2127, "1999": 1932, "2000": 1583, "2001": 1368, "2002": 1234, "2003": 1870, "2004": 2709, "2005": 2934, "2006": null, "2007": null, "2008": 2938, "2009": 3003, "2010": 2542, "2011": 2534, "2012": 2418, "2013": 4265, "2014": 3990, "2015": 4053, "2016": 4544, "2017": 4788, "2018": 3815, "2019": 3588, "2020": 2920, "2021": 3575, "2022": 3743, "2023": 4228
    },
    {
      indicator_ar: "جرائم الاعتداء المبلغ عنها",
      indicator_en: "Reported Assault Crimes",
      "1996": 3269, "1997": 2144, "1998": 3107, "1999": 3331, "2000": 3525, "2001": 2901, "2002": 1420, "2003": 2269, "2004": 3126, "2005": 3963, "2006": null, "2007": null, "2008": 2425, "2009": 6268, "2010": 8146, "2011": 8066, "2012": 8860, "2013": 8586, "2014": 8223, "2015": 7669, "2016": 8228, "2017": 8460, "2018": 9513, "2019": 9001, "2020": 6186, "2021": 12815, "2022": 12605, "2023": 11857
    },
    // Other data omitted for brevity, but included in the full implementation
  ],
  reportedDrugCrimesByGovernorate: [
    {governorate_ar: "جنين", governorate_en: "Jenin", "1997": 13, "1998": 9, "1999": 5, "2000": 31, "2001": 15, "2002": 8, "2003": 6, "2004": 27, "2005": 20, "2008": 34, "2009": 32, "2010": 32, "2011": 37, "2012": 29, "2013": 63, "2014": 65, "2015": 96, "2016": 134, "2017": 204, "2018": 267, "2019": 154, "2020": 152, "2021": 344, "2022": 106, "2023": 157},
    // Other governorates data omitted for brevity
  ],
  alAqsaIntifadaMartyrs: {
    title_ar: "شهداء انتفاضة الأقصى حسب السنة 2000 - 2022",
    title_en: "Martyrs of Al-Aqsa Intifada by Year 2000 - 2022",
    data_note_ar: "البيانات للفترة 29 أيلول - 31 كانون 2000، وهي عرضة للتغيير نتيجة الأبحاث الجارية، وتعكس الحالات الموثقة فقط",
    data_note_en: "Data for the period September 29 - December 31, 2000, subject to change due to ongoing research, and reflects documented cases only.",
    years: [
      {year: 2000, count: 333, note: "Data for Sep 29 - Dec 31, 2000"},
      {year: 2001, count: 605},
      // Other years omitted for brevity
    ],
    total: 11541
  },
  westBankLandUse2017: {
    title_ar: "مساحة الأراضي في الضفة الغربية حسب تقسيم الاحتلال الإسرائيلي والمحافظة، 2017",
    title_en: "Land Area in the West Bank by Israeli Occupation Classification and Governorate, 2017",
    unit: "كيلومتر مربع (Square Kilometer)",
    // Data omitted for brevity
  },
  homicidesByGovernorateSexYear: [
    // Data omitted for brevity
  ],
  westBankSettlementIndicators: {
    title_ar: "مؤشرات مختارة للمواقع الاستعمارية في الضفة الغربية",
    title_en: "Selected Indicators for Colonial Sites in the West Bank",
    // Data omitted for brevity
  },
  homicideAttemptedHomicideByGovernorate: [
    // Data omitted for brevity
  ]
};

export default palestineData;