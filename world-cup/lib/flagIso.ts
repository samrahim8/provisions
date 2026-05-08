export const FIFA_TO_ISO: Record<string, string> = {
  USA: "us", CAN: "ca", MEX: "mx",
  ARG: "ar", BRA: "br", URU: "uy", COL: "co", ECU: "ec", PAR: "py", VEN: "ve",
  FRA: "fr", ENG: "gb-eng", GER: "de", ESP: "es", POR: "pt", NED: "nl",
  BEL: "be", ITA: "it", CRO: "hr", SUI: "ch", DEN: "dk", POL: "pl",
  AUT: "at", TUR: "tr", NOR: "no", SWE: "se", SCO: "gb-sct", WAL: "gb-wls",
  UKR: "ua",
  JPN: "jp", KOR: "kr", AUS: "au", IRN: "ir", KSA: "sa", QAT: "qa",
  UZB: "uz", JOR: "jo",
  MAR: "ma", SEN: "sn", EGY: "eg", NGA: "ng", CIV: "ci", CMR: "cm",
  GHA: "gh", ALG: "dz", TUN: "tn", RSA: "za",
  NZL: "nz",
};

export function flagUrl(teamCode: string, width = 80): string {
  const iso = FIFA_TO_ISO[teamCode.toUpperCase()];
  if (!iso) return "";
  return `https://flagcdn.com/w${width}/${iso}.png`;
}
