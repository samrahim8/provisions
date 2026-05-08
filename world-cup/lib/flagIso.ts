// FIFA 3-letter code → flagcdn.com ISO slug for the 48 teams qualified
// for the 2026 FIFA World Cup. GB home nations use subdivision codes.
export const FIFA_TO_ISO: Record<string, string> = {
  // CONCACAF
  USA: "us", CAN: "ca", MEX: "mx", PAN: "pa", CUW: "cw", HAI: "ht",
  // CONMEBOL
  ARG: "ar", BRA: "br", URU: "uy", COL: "co", ECU: "ec", PAR: "py",
  // UEFA
  FRA: "fr", ENG: "gb-eng", GER: "de", ESP: "es", POR: "pt", NED: "nl",
  BEL: "be", CRO: "hr", SUI: "ch", AUT: "at", TUR: "tr", NOR: "no",
  SWE: "se", SCO: "gb-sct", BIH: "ba", CZE: "cz",
  // AFC
  JPN: "jp", KOR: "kr", AUS: "au", IRN: "ir", KSA: "sa", QAT: "qa",
  UZB: "uz", JOR: "jo", IRQ: "iq",
  // CAF
  MAR: "ma", SEN: "sn", EGY: "eg", CIV: "ci", GHA: "gh", ALG: "dz",
  TUN: "tn", RSA: "za", CPV: "cv", COD: "cd",
  // OFC
  NZL: "nz",
};

export function flagUrl(teamCode: string, width = 80): string {
  const iso = FIFA_TO_ISO[teamCode.toUpperCase()];
  if (!iso) return "";
  return `https://flagcdn.com/w${width}/${iso}.png`;
}
