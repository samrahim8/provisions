// provisions.soccer — shared fixture data.
// Single source of truth for all 104 matches. The hub (index.html) and
// The Daily (the-daily.html) both render from this file; edit fixtures here only.
// Row: [home, away, venue, city, ISO kickoff (UTC), round, group]

// ── Knockout slot labels (for TBD teams) ──
window.WC_SLOT_NAMES = {
  "1A":"Winner Group A","1B":"Winner Group B","1C":"Winner Group C","1D":"Winner Group D",
  "1E":"Winner Group E","1F":"Winner Group F","1G":"Winner Group G","1H":"Winner Group H",
  "1I":"Winner Group I","1J":"Winner Group J","1K":"Winner Group K","1L":"Winner Group L",
  "2A":"Runner-up A","2B":"Runner-up B","2C":"Runner-up C","2D":"Runner-up D",
  "2E":"Runner-up E","2F":"Runner-up F","2G":"Runner-up G","2H":"Runner-up H",
  "2I":"Runner-up I","2J":"Runner-up J","2K":"Runner-up K","2L":"Runner-up L",
  "3*":"3rd-place qualifier"
};

window.WC_SCHEDULE = [
  // ─── Matchday 1 ───
  ["MEX","RSA","Estadio Banorte","Mexico City","2026-06-11T19:00:00Z","Matchday 1","A"],
  ["KOR","CZE","Estadio Akron","Guadalajara","2026-06-12T02:00:00Z","Matchday 1","A"],
  ["CAN","BIH","BMO Field","Toronto","2026-06-12T19:00:00Z","Matchday 1","B"],
  ["USA","PAR","SoFi Stadium","Inglewood","2026-06-13T01:00:00Z","Matchday 1","D"],
  ["QAT","SUI","Levi's Stadium","Santa Clara","2026-06-13T19:00:00Z","Matchday 1","B"],
  ["BRA","MAR","MetLife Stadium","East Rutherford","2026-06-13T22:00:00Z","Matchday 1","C"],
  ["HAI","SCO","Gillette Stadium","Foxborough","2026-06-14T01:00:00Z","Matchday 1","C"],
  ["AUS","TUR","BC Place","Vancouver","2026-06-14T04:00:00Z","Matchday 1","D"],
  ["GER","CUW","NRG Stadium","Houston","2026-06-14T17:00:00Z","Matchday 1","E"],
  ["NED","JPN","AT&T Stadium","Arlington","2026-06-14T20:00:00Z","Matchday 1","F"],
  ["CIV","ECU","Lincoln Financial Field","Philadelphia","2026-06-14T23:00:00Z","Matchday 1","E"],
  ["SWE","TUN","Estadio BBVA","Guadalupe","2026-06-15T02:00:00Z","Matchday 1","F"],
  ["ESP","CPV","Mercedes-Benz Stadium","Atlanta","2026-06-15T16:00:00Z","Matchday 1","H"],
  ["BEL","EGY","Lumen Field","Seattle","2026-06-15T19:00:00Z","Matchday 1","G"],
  ["KSA","URU","Hard Rock Stadium","Miami Gardens","2026-06-15T22:00:00Z","Matchday 1","H"],
  ["IRN","NZL","SoFi Stadium","Inglewood","2026-06-16T01:00:00Z","Matchday 1","G"],
  ["FRA","SEN","MetLife Stadium","East Rutherford","2026-06-16T19:00:00Z","Matchday 1","I"],
  ["IRQ","NOR","Gillette Stadium","Foxborough","2026-06-16T22:00:00Z","Matchday 1","I"],
  ["ARG","ALG","GEHA Field at Arrowhead Stadium","Kansas City","2026-06-17T01:00:00Z","Matchday 1","J"],
  ["AUT","JOR","Levi's Stadium","Santa Clara","2026-06-17T04:00:00Z","Matchday 1","J"],
  ["POR","COD","NRG Stadium","Houston","2026-06-17T17:00:00Z","Matchday 1","K"],
  ["ENG","CRO","AT&T Stadium","Arlington","2026-06-17T20:00:00Z","Matchday 1","L"],
  ["GHA","PAN","BMO Field","Toronto","2026-06-17T23:00:00Z","Matchday 1","L"],
  ["UZB","COL","Estadio Banorte","Mexico City","2026-06-18T02:00:00Z","Matchday 1","K"],

  // ─── Matchday 2 ───
  ["CZE","RSA","Mercedes-Benz Stadium","Atlanta","2026-06-18T16:00:00Z","Matchday 2","A"],
  ["SUI","BIH","SoFi Stadium","Inglewood","2026-06-18T19:00:00Z","Matchday 2","B"],
  ["CAN","QAT","BC Place","Vancouver","2026-06-18T22:00:00Z","Matchday 2","B"],
  ["MEX","KOR","Estadio Akron","Guadalajara","2026-06-19T01:00:00Z","Matchday 2","A"],
  ["USA","AUS","Lumen Field","Seattle","2026-06-19T19:00:00Z","Matchday 2","D"],
  ["SCO","MAR","Gillette Stadium","Foxborough","2026-06-19T22:00:00Z","Matchday 2","C"],
  ["BRA","HAI","Lincoln Financial Field","Philadelphia","2026-06-20T00:30:00Z","Matchday 2","C"],
  ["TUR","PAR","Levi's Stadium","Santa Clara","2026-06-20T03:00:00Z","Matchday 2","D"],
  ["NED","SWE","NRG Stadium","Houston","2026-06-20T17:00:00Z","Matchday 2","F"],
  ["GER","CIV","BMO Field","Toronto","2026-06-20T20:00:00Z","Matchday 2","E"],
  ["ECU","CUW","GEHA Field at Arrowhead Stadium","Kansas City","2026-06-21T00:00:00Z","Matchday 2","E"],
  ["TUN","JPN","Estadio BBVA","Guadalupe","2026-06-21T04:00:00Z","Matchday 2","F"],
  ["ESP","KSA","Mercedes-Benz Stadium","Atlanta","2026-06-21T16:00:00Z","Matchday 2","H"],
  ["BEL","IRN","SoFi Stadium","Inglewood","2026-06-21T19:00:00Z","Matchday 2","G"],
  ["URU","CPV","Hard Rock Stadium","Miami Gardens","2026-06-21T22:00:00Z","Matchday 2","H"],
  ["NZL","EGY","BC Place","Vancouver","2026-06-22T01:00:00Z","Matchday 2","G"],
  ["ARG","AUT","AT&T Stadium","Arlington","2026-06-22T17:00:00Z","Matchday 2","J"],
  ["FRA","IRQ","Lincoln Financial Field","Philadelphia","2026-06-22T21:00:00Z","Matchday 2","I"],
  ["NOR","SEN","MetLife Stadium","East Rutherford","2026-06-23T00:00:00Z","Matchday 2","I"],
  ["JOR","ALG","Levi's Stadium","Santa Clara","2026-06-23T03:00:00Z","Matchday 2","J"],
  ["POR","UZB","NRG Stadium","Houston","2026-06-23T17:00:00Z","Matchday 2","K"],
  ["ENG","GHA","Gillette Stadium","Foxborough","2026-06-23T20:00:00Z","Matchday 2","L"],
  ["PAN","CRO","BMO Field","Toronto","2026-06-23T23:00:00Z","Matchday 2","L"],
  ["COL","COD","Estadio Akron","Guadalajara","2026-06-24T02:00:00Z","Matchday 2","K"],

  // ─── Matchday 3 ───
  ["SUI","CAN","BC Place","Vancouver","2026-06-24T19:00:00Z","Matchday 3","B"],
  ["BIH","QAT","Lumen Field","Seattle","2026-06-24T19:00:00Z","Matchday 3","B"],
  ["SCO","BRA","Hard Rock Stadium","Miami Gardens","2026-06-24T22:00:00Z","Matchday 3","C"],
  ["MAR","HAI","Mercedes-Benz Stadium","Atlanta","2026-06-24T22:00:00Z","Matchday 3","C"],
  ["CZE","MEX","Estadio Azteca","Mexico City","2026-06-25T01:00:00Z","Matchday 3","A"],
  ["RSA","KOR","Estadio BBVA","Guadalupe","2026-06-25T01:00:00Z","Matchday 3","A"],
  ["CUW","CIV","Lincoln Financial Field","Philadelphia","2026-06-25T20:00:00Z","Matchday 3","E"],
  ["ECU","GER","MetLife Stadium","East Rutherford","2026-06-25T20:00:00Z","Matchday 3","E"],
  ["JPN","SWE","AT&T Stadium","Arlington","2026-06-25T23:00:00Z","Matchday 3","F"],
  ["TUN","NED","GEHA Field at Arrowhead Stadium","Kansas City","2026-06-25T23:00:00Z","Matchday 3","F"],
  ["TUR","USA","SoFi Stadium","Inglewood","2026-06-26T02:00:00Z","Matchday 3","D"],
  ["PAR","AUS","Levi's Stadium","Santa Clara","2026-06-26T02:00:00Z","Matchday 3","D"],
  ["NOR","FRA","Gillette Stadium","Foxborough","2026-06-26T19:00:00Z","Matchday 3","I"],
  ["SEN","IRQ","BMO Field","Toronto","2026-06-26T19:00:00Z","Matchday 3","I"],
  ["EGY","IRN","Lumen Field","Seattle","2026-06-27T03:00:00Z","Matchday 3","G"],
  ["NZL","BEL","BC Place","Vancouver","2026-06-27T03:00:00Z","Matchday 3","G"],
  ["CPV","KSA","NRG Stadium","Houston","2026-06-27T00:00:00Z","Matchday 3","H"],
  ["URU","ESP","Estadio Akron","Guadalajara","2026-06-27T00:00:00Z","Matchday 3","H"],
  ["PAN","ENG","MetLife Stadium","East Rutherford","2026-06-27T21:00:00Z","Matchday 3","L"],
  ["CRO","GHA","Lincoln Financial Field","Philadelphia","2026-06-27T21:00:00Z","Matchday 3","L"],
  ["COL","POR","Hard Rock Stadium","Miami Gardens","2026-06-27T23:30:00Z","Matchday 3","K"],
  ["COD","UZB","Mercedes-Benz Stadium","Atlanta","2026-06-27T23:30:00Z","Matchday 3","K"],
  ["ALG","AUT","GEHA Field at Arrowhead Stadium","Kansas City","2026-06-28T02:00:00Z","Matchday 3","J"],
  ["JOR","ARG","AT&T Stadium","Arlington","2026-06-28T02:00:00Z","Matchday 3","J"],

  // ─── Round of 32 ───
  ["RSA","CAN","SoFi Stadium","Inglewood","2026-06-28T19:00:00Z","Round of 32",""],
  ["GER","PAR","Gillette Stadium","Foxborough","2026-06-29T20:30:00Z","Round of 32",""],
  ["BRA","JPN","NRG Stadium","Houston","2026-06-29T17:00:00Z","Round of 32",""],
  ["NED","MAR","Estadio BBVA","Guadalupe","2026-06-30T01:00:00Z","Round of 32",""],
  ["CIV","NOR","AT&T Stadium","Arlington","2026-06-30T17:00:00Z","Round of 32",""],
  ["FRA","SWE","MetLife Stadium","East Rutherford","2026-06-30T21:00:00Z","Round of 32",""],
  ["MEX","ECU","Estadio Banorte","Mexico City","2026-07-01T01:00:00Z","Round of 32",""],
  ["ENG","COD","Mercedes-Benz Stadium","Atlanta","2026-07-01T16:00:00Z","Round of 32",""],
  ["BEL","SEN","Lumen Field","Seattle","2026-07-01T20:00:00Z","Round of 32",""],
  ["USA","BIH","Levi's Stadium","Santa Clara","2026-07-02T00:00:00Z","Round of 32",""],
  ["POR","CRO","BMO Field","Toronto","2026-07-02T23:00:00Z","Round of 32",""],
  ["ESP","AUT","SoFi Stadium","Inglewood","2026-07-02T19:00:00Z","Round of 32",""],
  ["SUI","ALG","BC Place","Vancouver","2026-07-03T03:00:00Z","Round of 32",""],
  ["ARG","CPV","Hard Rock Stadium","Miami Gardens","2026-07-03T22:00:00Z","Round of 32",""],
  ["AUS","EGY","AT&T Stadium","Arlington","2026-07-03T18:00:00Z","Round of 32",""],
  ["COL","GHA","GEHA Field at Arrowhead Stadium","Kansas City","2026-07-04T01:30:00Z","Round of 32",""],

  // ─── Round of 16 ───
  ["TBD","TBD","NRG Stadium","Houston","2026-07-04T17:00:00Z","Round of 16",""],
  ["TBD","TBD","Lincoln Financial Field","Philadelphia","2026-07-04T21:00:00Z","Round of 16",""],
  ["TBD","TBD","MetLife Stadium","East Rutherford","2026-07-05T20:00:00Z","Round of 16",""],
  ["TBD","TBD","Estadio Banorte","Mexico City","2026-07-06T00:00:00Z","Round of 16",""],
  ["TBD","TBD","Lumen Field","Seattle","2026-07-07T00:00:00Z","Round of 16",""],
  ["TBD","TBD","AT&T Stadium","Arlington","2026-07-06T19:00:00Z","Round of 16",""],
  ["TBD","TBD","Mercedes-Benz Stadium","Atlanta","2026-07-07T16:00:00Z","Round of 16",""],
  ["TBD","TBD","BC Place","Vancouver","2026-07-07T20:00:00Z","Round of 16",""],

  // ─── Quarter-finals ───
  ["TBD","TBD","Gillette Stadium","Foxborough","2026-07-09T20:00:00Z","Quarter-finals",""],
  ["TBD","TBD","SoFi Stadium","Inglewood","2026-07-10T19:00:00Z","Quarter-finals",""],
  ["TBD","TBD","Hard Rock Stadium","Miami Gardens","2026-07-11T21:00:00Z","Quarter-finals",""],
  ["TBD","TBD","GEHA Field at Arrowhead Stadium","Kansas City","2026-07-12T01:00:00Z","Quarter-finals",""],

  // ─── Semi-finals ───
  ["TBD","TBD","AT&T Stadium","Arlington","2026-07-14T19:00:00Z","Semi-finals",""],
  ["TBD","TBD","Mercedes-Benz Stadium","Atlanta","2026-07-15T19:00:00Z","Semi-finals",""],

  // ─── Third Place ───
  ["TBD","TBD","Hard Rock Stadium","Miami Gardens","2026-07-18T21:00:00Z","Third Place",""],

  // ─── Final ───
  ["TBD","TBD","MetLife Stadium","East Rutherford","2026-07-19T19:00:00Z","Final",""]
];
