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
  { code: "USA", name: "United States", flag: "🇺🇸", primary: "#BF0A30", secondary: "#FFFFFF", accent: "#002868", confederation: "CONCACAF" },
  { code: "CAN", name: "Canada", flag: "🇨🇦", primary: "#D52B1E", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "CONCACAF" },
  { code: "MEX", name: "Mexico", flag: "🇲🇽", primary: "#006847", secondary: "#FFFFFF", accent: "#CE1126", confederation: "CONCACAF" },
  { code: "ARG", name: "Argentina", flag: "🇦🇷", primary: "#74ACDF", secondary: "#FFFFFF", accent: "#F6B40E", confederation: "CONMEBOL" },
  { code: "BRA", name: "Brazil", flag: "🇧🇷", primary: "#FFDF00", secondary: "#009C3B", accent: "#002776", confederation: "CONMEBOL" },
  { code: "URU", name: "Uruguay", flag: "🇺🇾", primary: "#5CBCE9", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "CONMEBOL" },
  { code: "COL", name: "Colombia", flag: "🇨🇴", primary: "#FCD116", secondary: "#003893", accent: "#CE1126", confederation: "CONMEBOL" },
  { code: "ECU", name: "Ecuador", flag: "🇪🇨", primary: "#FFD100", secondary: "#003893", accent: "#EF3340", confederation: "CONMEBOL" },
  { code: "PAR", name: "Paraguay", flag: "🇵🇾", primary: "#D52B1E", secondary: "#FFFFFF", accent: "#0038A8", confederation: "CONMEBOL" },
  { code: "VEN", name: "Venezuela", flag: "🇻🇪", primary: "#7A1F2A", secondary: "#FFCC00", accent: "#00247D", confederation: "CONMEBOL" },
  { code: "FRA", name: "France", flag: "🇫🇷", primary: "#0055A4", secondary: "#FFFFFF", accent: "#EF4135", confederation: "UEFA" },
  { code: "ENG", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", primary: "#FFFFFF", secondary: "#CE1124", accent: "#00247D", confederation: "UEFA" },
  { code: "GER", name: "Germany", flag: "🇩🇪", primary: "#000000", secondary: "#DD0000", accent: "#FFCE00", confederation: "UEFA" },
  { code: "ESP", name: "Spain", flag: "🇪🇸", primary: "#AA151B", secondary: "#FFD100", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "POR", name: "Portugal", flag: "🇵🇹", primary: "#046A38", secondary: "#DA291C", accent: "#FFE900", confederation: "UEFA" },
  { code: "NED", name: "Netherlands", flag: "🇳🇱", primary: "#FF6C00", secondary: "#FFFFFF", accent: "#21468B", confederation: "UEFA" },
  { code: "BEL", name: "Belgium", flag: "🇧🇪", primary: "#000000", secondary: "#FAE042", accent: "#ED2939", confederation: "UEFA" },
  { code: "ITA", name: "Italy", flag: "🇮🇹", primary: "#0066B3", secondary: "#FFFFFF", accent: "#009246", confederation: "UEFA" },
  { code: "CRO", name: "Croatia", flag: "🇭🇷", primary: "#FF0000", secondary: "#FFFFFF", accent: "#171796", confederation: "UEFA" },
  { code: "SUI", name: "Switzerland", flag: "🇨🇭", primary: "#DA291C", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "DEN", name: "Denmark", flag: "🇩🇰", primary: "#C8102E", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "POL", name: "Poland", flag: "🇵🇱", primary: "#DC143C", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "AUT", name: "Austria", flag: "🇦🇹", primary: "#ED2939", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "TUR", name: "Türkiye", flag: "🇹🇷", primary: "#E30A17", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "NOR", name: "Norway", flag: "🇳🇴", primary: "#BA0C2F", secondary: "#FFFFFF", accent: "#00205B", confederation: "UEFA" },
  { code: "SWE", name: "Sweden", flag: "🇸🇪", primary: "#006AA7", secondary: "#FECC00", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "SCO", name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", primary: "#0065BD", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "WAL", name: "Wales", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", primary: "#D30731", secondary: "#FFFFFF", accent: "#00B140", confederation: "UEFA" },
  { code: "UKR", name: "Ukraine", flag: "🇺🇦", primary: "#0057B7", secondary: "#FFD500", accent: "#1A1A1A", confederation: "UEFA" },
  { code: "JPN", name: "Japan", flag: "🇯🇵", primary: "#0A1F4D", secondary: "#FFFFFF", accent: "#BC002D", confederation: "AFC" },
  { code: "KOR", name: "South Korea", flag: "🇰🇷", primary: "#C60C30", secondary: "#FFFFFF", accent: "#003478", confederation: "AFC" },
  { code: "AUS", name: "Australia", flag: "🇦🇺", primary: "#FFCD00", secondary: "#00843D", accent: "#012169", confederation: "AFC" },
  { code: "IRN", name: "Iran", flag: "🇮🇷", primary: "#FFFFFF", secondary: "#239F40", accent: "#DA0000", confederation: "AFC" },
  { code: "KSA", name: "Saudi Arabia", flag: "🇸🇦", primary: "#006C35", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "AFC" },
  { code: "QAT", name: "Qatar", flag: "🇶🇦", primary: "#8A1538", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "AFC" },
  { code: "UZB", name: "Uzbekistan", flag: "🇺🇿", primary: "#0099B5", secondary: "#FFFFFF", accent: "#CE1126", confederation: "AFC" },
  { code: "JOR", name: "Jordan", flag: "🇯🇴", primary: "#000000", secondary: "#FFFFFF", accent: "#CE1126", confederation: "AFC" },
  { code: "MAR", name: "Morocco", flag: "🇲🇦", primary: "#C1272D", secondary: "#006233", accent: "#FFFFFF", confederation: "CAF" },
  { code: "SEN", name: "Senegal", flag: "🇸🇳", primary: "#00853F", secondary: "#FDEF42", accent: "#E31B23", confederation: "CAF" },
  { code: "EGY", name: "Egypt", flag: "🇪🇬", primary: "#CE1126", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "CAF" },
  { code: "NGA", name: "Nigeria", flag: "🇳🇬", primary: "#008751", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "CAF" },
  { code: "CIV", name: "Côte d'Ivoire", flag: "🇨🇮", primary: "#FF8200", secondary: "#FFFFFF", accent: "#009E60", confederation: "CAF" },
  { code: "CMR", name: "Cameroon", flag: "🇨🇲", primary: "#007A5E", secondary: "#FCD116", accent: "#CE1126", confederation: "CAF" },
  { code: "GHA", name: "Ghana", flag: "🇬🇭", primary: "#CE1126", secondary: "#FCD116", accent: "#006B3F", confederation: "CAF" },
  { code: "ALG", name: "Algeria", flag: "🇩🇿", primary: "#006233", secondary: "#FFFFFF", accent: "#D21034", confederation: "CAF" },
  { code: "TUN", name: "Tunisia", flag: "🇹🇳", primary: "#E70013", secondary: "#FFFFFF", accent: "#1A1A1A", confederation: "CAF" },
  { code: "RSA", name: "South Africa", flag: "🇿🇦", primary: "#007749", secondary: "#FFB81C", accent: "#001489", confederation: "CAF" },
  { code: "NZL", name: "New Zealand", flag: "🇳🇿", primary: "#000000", secondary: "#FFFFFF", accent: "#C8102E", confederation: "OFC" },
];

export const POSITIONS = ["GK", "DEF", "MID", "FWD"] as const;
export type Position = (typeof POSITIONS)[number];

export function teamByCode(code: string): Team | undefined {
  return TEAMS.find((t) => t.code === code);
}
