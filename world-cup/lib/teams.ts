export type Team = {
  code: string;
  name: string;
  flag: string;
  primary: string;
  secondary: string;
  accent: string;
  confederation: "UEFA" | "CONMEBOL" | "CONCACAF" | "AFC" | "CAF" | "OFC";
};

export const TEAMS: Team[] = [
  // CONCACAF (6) — three hosts + three qualifiers
  { code: "USA", name: "United States", flag: "🇺🇸", primary: "#BF0A30", secondary: "#FFFFFF", accent: "#002868", confederation: "CONCACAF" },
  { code: "CAN", name: "Canada", flag: "🇨🇦", primary: "#D52B1E", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "CONCACAF" },
  { code: "MEX", name: "Mexico", flag: "🇲🇽", primary: "#006847", secondary: "#FFFFFF", accent: "#CE1126", confederation: "CONCACAF" },
  { code: "PAN", name: "Panama", flag: "🇵🇦", primary: "#D32B1E", secondary: "#FFFFFF", accent: "#0066B3", confederation: "CONCACAF" },
  { code: "CUW", name: "Curaçao", flag: "🇨🇼", primary: "#002B7F", secondary: "#F9E300", accent: "#FFFFFF", confederation: "CONCACAF" },
  { code: "HAI", name: "Haiti", flag: "🇭🇹", primary: "#00209F", secondary: "#D21034", accent: "#FFFFFF", confederation: "CONCACAF" },

  // CONMEBOL (6)
  { code: "ARG", name: "Argentina", flag: "🇦🇷", primary: "#74ACDF", secondary: "#FFFFFF", accent: "#F6B40E", confederation: "CONMEBOL" },
  { code: "BRA", name: "Brazil", flag: "🇧🇷", primary: "#FFDF00", secondary: "#009C3B", accent: "#002776", confederation: "CONMEBOL" },
  { code: "URU", name: "Uruguay", flag: "🇺🇾", primary: "#5CBCE9", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "CONMEBOL" },
  { code: "COL", name: "Colombia", flag: "🇨🇴", primary: "#FCD116", secondary: "#003893", accent: "#CE1126", confederation: "CONMEBOL" },
  { code: "ECU", name: "Ecuador", flag: "🇪🇨", primary: "#FFD100", secondary: "#003893", accent: "#EF3340", confederation: "CONMEBOL" },
  { code: "PAR", name: "Paraguay", flag: "🇵🇾", primary: "#D52B1E", secondary: "#FFFFFF", accent: "#0038A8", confederation: "CONMEBOL" },

  // UEFA (16)
  { code: "FRA", name: "France", flag: "🇫🇷", primary: "#0055A4", secondary: "#FFFFFF", accent: "#EF4135", confederation: "UEFA" },
  { code: "ENG", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", primary: "#FFFFFF", secondary: "#CE1124", accent: "#00247D", confederation: "UEFA" },
  { code: "GER", name: "Germany", flag: "🇩🇪", primary: "#000000", secondary: "#DD0000", accent: "#FFCE00", confederation: "UEFA" },
  { code: "ESP", name: "Spain", flag: "🇪🇸", primary: "#AA151B", secondary: "#FFD100", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "POR", name: "Portugal", flag: "🇵🇹", primary: "#046A38", secondary: "#DA291C", accent: "#FFE900", confederation: "UEFA" },
  { code: "NED", name: "Netherlands", flag: "🇳🇱", primary: "#FF6C00", secondary: "#FFFFFF", accent: "#21468B", confederation: "UEFA" },
  { code: "BEL", name: "Belgium", flag: "🇧🇪", primary: "#000000", secondary: "#FAE042", accent: "#ED2939", confederation: "UEFA" },
  { code: "CRO", name: "Croatia", flag: "🇭🇷", primary: "#FF0000", secondary: "#FFFFFF", accent: "#171796", confederation: "UEFA" },
  { code: "SUI", name: "Switzerland", flag: "🇨🇭", primary: "#DA291C", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "AUT", name: "Austria", flag: "🇦🇹", primary: "#ED2939", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "TUR", name: "Türkiye", flag: "🇹🇷", primary: "#E30A17", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "NOR", name: "Norway", flag: "🇳🇴", primary: "#BA0C2F", secondary: "#FFFFFF", accent: "#00205B", confederation: "UEFA" },
  { code: "SWE", name: "Sweden", flag: "🇸🇪", primary: "#006AA7", secondary: "#FECC00", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "SCO", name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", primary: "#0065BD", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "BIH", name: "Bosnia & Herzegovina", flag: "🇧🇦", primary: "#002395", secondary: "#FECB00", accent: "#FFFFFF", confederation: "UEFA" },
  { code: "CZE", name: "Czechia", flag: "🇨🇿", primary: "#D7141A", secondary: "#FFFFFF", accent: "#11457E", confederation: "UEFA" },

  // AFC (9)
  { code: "JPN", name: "Japan", flag: "🇯🇵", primary: "#0A1F4D", secondary: "#FFFFFF", accent: "#BC002D", confederation: "AFC" },
  { code: "KOR", name: "South Korea", flag: "🇰🇷", primary: "#C60C30", secondary: "#FFFFFF", accent: "#003478", confederation: "AFC" },
  { code: "AUS", name: "Australia", flag: "🇦🇺", primary: "#FFCD00", secondary: "#00843D", accent: "#012169", confederation: "AFC" },
  { code: "IRN", name: "Iran", flag: "🇮🇷", primary: "#FFFFFF", secondary: "#239F40", accent: "#DA0000", confederation: "AFC" },
  { code: "KSA", name: "Saudi Arabia", flag: "🇸🇦", primary: "#006C35", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "AFC" },
  { code: "QAT", name: "Qatar", flag: "🇶🇦", primary: "#8A1538", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "AFC" },
  { code: "UZB", name: "Uzbekistan", flag: "🇺🇿", primary: "#0099B5", secondary: "#FFFFFF", accent: "#CE1126", confederation: "AFC" },
  { code: "JOR", name: "Jordan", flag: "🇯🇴", primary: "#000000", secondary: "#FFFFFF", accent: "#CE1126", confederation: "AFC" },
  { code: "IRQ", name: "Iraq", flag: "🇮🇶", primary: "#007A3D", secondary: "#CE1126", accent: "#000000", confederation: "AFC" },

  // CAF (10)
  { code: "MAR", name: "Morocco", flag: "🇲🇦", primary: "#C1272D", secondary: "#006233", accent: "#FFFFFF", confederation: "CAF" },
  { code: "SEN", name: "Senegal", flag: "🇸🇳", primary: "#00853F", secondary: "#FDEF42", accent: "#E31B23", confederation: "CAF" },
  { code: "EGY", name: "Egypt", flag: "🇪🇬", primary: "#CE1126", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "CAF" },
  { code: "CIV", name: "Côte d'Ivoire", flag: "🇨🇮", primary: "#FF8200", secondary: "#FFFFFF", accent: "#009E60", confederation: "CAF" },
  { code: "GHA", name: "Ghana", flag: "🇬🇭", primary: "#CE1126", secondary: "#FCD116", accent: "#006B3F", confederation: "CAF" },
  { code: "ALG", name: "Algeria", flag: "🇩🇿", primary: "#006233", secondary: "#FFFFFF", accent: "#D21034", confederation: "CAF" },
  { code: "TUN", name: "Tunisia", flag: "🇹🇳", primary: "#E70013", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "CAF" },
  { code: "RSA", name: "South Africa", flag: "🇿🇦", primary: "#007749", secondary: "#FFB81C", accent: "#001489", confederation: "CAF" },
  { code: "CPV", name: "Cape Verde", flag: "🇨🇻", primary: "#6CACDE", secondary: "#FFFFFF", accent: "#C8102E", confederation: "CAF" },
  { code: "COD", name: "DR Congo", flag: "🇨🇩", primary: "#4FA8DC", secondary: "#CE1021", accent: "#F7D618", confederation: "CAF" },

  // OFC (1)
  { code: "NZL", name: "New Zealand", flag: "🇳🇿", primary: "#000000", secondary: "#FFFFFF", accent: "#C8102E", confederation: "OFC" },
];

export const POSITIONS = ["GK", "DEF", "MID", "FWD"] as const;
export type Position = (typeof POSITIONS)[number];

export function teamByCode(code: string): Team | undefined {
  return TEAMS.find((t) => t.code === code);
}
