// You Know Ball — daily five question banks.
// Keyed by LOCAL calendar date (matches the slate's local-day convention).
// Each day: 5 questions themed to that day's fixtures where possible.
// { q, o: [4 options], a: correct index, e: explanation }
// Day number is computed from the tournament opener (Jun 11), not stored here.
window.YKB_DAYS = {
  "2026-06-11": {
    theme: "Opening Day",
    questions: [
      { q: "Mexico kicks off the tournament today. Counting this summer, how many World Cups have been staged at least partly in Mexico?", o: ["1", "2", "3", "4"], a: 2, e: "1970, 1986, and now 2026. No country had hosted three until today." },
      { q: "Which stadium was the first ever to host two World Cup finals?", o: ["Maracanã", "Wembley", "Estadio Azteca", "San Siro"], a: 2, e: "Azteca staged Pelé's 1970 coronation and Maradona's 1986 masterpiece. Today it opens a third tournament." },
      { q: "Today's opener is a rematch of the 2010 opener. Who scored that tournament's iconic first goal for South Africa against Mexico?", o: ["Steven Pienaar", "Siphiwe Tshabalala", "Katlego Mphela", "Bongani Khumalo"], a: 1, e: "Tshabalala's rocket and the corner-flag dance is one of the great opening-day moments. It ended 1-1." },
      { q: "South Korea went further in 2002 than any Asian side ever has. Where did the run end?", o: ["Round of 16", "Quarter-final", "Semi-final", "The final"], a: 2, e: "Co-hosts Korea beat Italy and Spain before losing 1-0 to Germany in the semis. They finished fourth." },
      { q: "Czechia's predecessors, Czechoslovakia, reached two World Cup finals. The 1962 final was lost to which team?", o: ["Italy", "Brazil", "England", "Hungary"], a: 1, e: "Brazil won 3-1 in Chile, with Garrincha running the tournament after Pelé got injured. The 1934 final was lost to Italy." },
    ],
  },
  "2026-06-12": {
    theme: "Matchday 1",
    questions: [
      { q: "Before 2022, Canada's men had played at exactly one World Cup. Which year?", o: ["1970", "1986", "1994", "2002"], a: 1, e: "Mexico '86, where they lost all three without scoring. The 36-year wait ended in Qatar." },
      { q: "Which World Cup still holds the all-time total attendance record?", o: ["USA 1994", "Brazil 2014", "Russia 2018", "Qatar 2022"], a: 0, e: "Nearly 3.6 million through the gates, with only 24 teams. This summer's 104-match edition is the first with a real shot at it." },
      { q: "Who scored Canada's first ever men's World Cup goal, in 2022?", o: ["Jonathan David", "Cyle Larin", "Alphonso Davies", "Atiba Hutchinson"], a: 2, e: "A 68th-second header against Croatia. Canada still lost 4-1, but the drought was over." },
      { q: "Bosnia & Herzegovina's all-time top scorer led the line at their only previous World Cup in 2014. Who?", o: ["Miralem Pjanić", "Edin Džeko", "Vedad Ibišević", "Zvjezdan Misimović"], a: 1, e: "Džeko, then of Manchester City. Bosnia beat Iran but went out on goal difference in the group." },
      { q: "Paraguay's deepest World Cup run ended in a 2010 quarter-final against the eventual champions. Who beat them?", o: ["Netherlands", "Germany", "Spain", "Uruguay"], a: 2, e: "Spain, 1-0, via David Villa. Paraguay even had a penalty saved at 0-0. They face the USA tonight." },
    ],
  },
  "2026-06-13": {
    theme: "Matchday 1",
    questions: [
      { q: "Which is the only nation to have appeared at every World Cup?", o: ["Germany", "Italy", "Brazil", "Argentina"], a: 2, e: "Brazil: 23 for 23 including this one. Nobody else is close." },
      { q: "In 2022, which country became the first African side to reach a World Cup semi-final?", o: ["Senegal", "Ghana", "Cameroon", "Morocco"], a: 3, e: "Morocco knocked out Spain and Portugal on the way. They open against Brazil today." },
      { q: "Across all their World Cup appearances, Scotland have never managed to do what?", o: ["Win a match", "Score a goal", "Get past the first round", "Qualify twice in a row"], a: 2, e: "Eight previous trips, zero knockout rounds, several legendary near-misses. Today the ninth attempt begins." },
      { q: "Haiti's Emmanuel Sanon made history in 1974 by scoring past which legendary goalkeeper, ending his record unbeaten run?", o: ["Gordon Banks", "Sepp Maier", "Dino Zoff", "Lev Yashin"], a: 2, e: "Zoff hadn't conceded for Italy in 1,142 minutes until Sanon ran through. Haiti's first World Cup goal, and they're back tonight after 52 years." },
      { q: "The fastest goal in World Cup history, 10.8 seconds in 2002, was scored by which Türkiye striker?", o: ["Nihat Kahveci", "Hakan Şükür", "İlhan Mansız", "Hasan Şaş"], a: 1, e: "Şükür, straight from kickoff in the third-place match against Korea. Türkiye finished third, still their best run." },
    ],
  },
  "2026-06-14": {
    theme: "Matchday 1",
    questions: [
      { q: "The Netherlands have reached three World Cup finals: 1974, 1978, 2010. How many did they win?", o: ["0", "1", "2", "3"], a: 0, e: "None. The greatest team never to win it. They open against Japan today." },
      { q: "In 2022, Japan topped their group by beating which two former champions?", o: ["France and Brazil", "Germany and Spain", "Italy and England", "Argentina and Uruguay"], a: 1, e: "Both by 2-1, both from behind. Then they nearly added Croatia in the round of 16." },
      { q: "The 'Cruyff Turn' was first unleashed at the 1974 World Cup against which country?", o: ["Sweden", "Brazil", "Uruguay", "West Germany"], a: 0, e: "Poor Jan Olsson never recovered. Sweden and the Dutch are both on today's slate." },
      { q: "Despite Drogba, the Touré brothers, and a golden generation, Côte d'Ivoire never got past which stage?", o: ["The group stage", "The round of 16", "The quarter-finals", "The semi-finals"], a: 0, e: "Three straight group exits (2006, 2010, 2014), twice from genuine groups of death. They start again today against Ecuador." },
      { q: "Curaçao debut today as the least-populous nation ever to reach a World Cup. Roughly how many people live there?", o: ["150,000", "500,000", "1.2 million", "3 million"], a: 0, e: "About the size of Springfield, Missouri. The previous record holder was Iceland (340,000) in 2018. They open against Germany." },
    ],
  },
  "2026-06-15": {
    theme: "Matchday 1",
    questions: [
      { q: "The biggest upset of 2022: Saudi Arabia beat which eventual champion in the group stage?", o: ["France", "Brazil", "Argentina", "Spain"], a: 2, e: "2-1 in Lusail, Messi and company's only loss of the tournament. The Saudis open against Uruguay today." },
      { q: "Mohamed Salah, back at a World Cup this summer, plays for which country?", o: ["Morocco", "Tunisia", "Algeria", "Egypt"], a: 3, e: "Egypt's all-time great. Their last trip in 2018 ended with three group losses; he'd like a word." },
      { q: "'The Maracanazo' refers to Uruguay silencing 200,000 fans by beating which host in the 1950 decider?", o: ["Argentina", "Brazil", "Chile", "Mexico"], a: 1, e: "Brazil needed only a draw at home. Uruguay won 2-1, and the Maracanã went so quiet it has its own word." },
      { q: "Belgium's golden generation peaked at Russia 2018 with which finish?", o: ["Champions", "Runners-up", "Third place", "Quarter-finals"], a: 2, e: "Beat Brazil in the quarters, lost the semi to France, then took third. The rebuild debuts against Egypt today." },
      { q: "New Zealand were the only unbeaten team at the 2010 World Cup. How many of their three group games did they draw?", o: ["One", "Two", "All three", "None, they won one"], a: 2, e: "Three draws, including against defending champions Italy, and out on points. Unbeaten, eliminated, immortal pub fact." },
    ],
  },
  "2026-06-16": {
    theme: "Matchday 1",
    questions: [
      { q: "Who captained France to the 1998 title and then managed them to the 2018 title?", o: ["Zinedine Zidane", "Didier Deschamps", "Laurent Blanc", "Marcel Desailly"], a: 1, e: "One of three men to win it as player and manager, with Zagallo and Beckenbauer." },
      { q: "Senegal stunned which defending champion in the opening match of the 2002 World Cup?", o: ["Brazil", "Germany", "France", "Italy"], a: 2, e: "Papa Bouba Diop, 1-0, and France went home without scoring a goal. Tonight: France v Senegal, first meeting at a World Cup since." },
      { q: "Norway's most famous World Cup result was a 1998 group-stage win over which team?", o: ["Italy", "Brazil", "Germany", "Argentina"], a: 1, e: "2-1 with two goals in the last seven minutes. Norway are back today for the first time since." },
      { q: "Algeria beat West Germany in 1982 but went out after the 'Disgrace of Gijón', a conveniently quiet 1-0 between West Germany and which side?", o: ["Austria", "Chile", "Poland", "Hungary"], a: 0, e: "Both teams knew 1-0 sent them through at Algeria's expense and played like it. Simultaneous final group kickoffs exist because of that afternoon." },
      { q: "Iraq's only previous World Cup appearance came in which year, also hosted in Mexico?", o: ["1970", "1978", "1986", "1994"], a: 2, e: "Mexico '86: three narrow one-goal losses and out. Forty years later, they return today." },
    ],
  },
  "2026-06-17": {
    theme: "Matchday 1",
    questions: [
      { q: "If he features this summer, Cristiano Ronaldo will have appeared at a record how many World Cups?", o: ["4", "5", "6", "7"], a: 2, e: "2006 through 2026. Messi can match it, which tells you everything about the last twenty years." },
      { q: "Croatia made the 2018 final and took third in 2022. Who ran their midfield in both, winning the 2018 Golden Ball?", o: ["Ivan Rakitić", "Mateo Kovačić", "Luka Modrić", "Marcelo Brozović"], a: 2, e: "Modrić was named the tournament's best player at 32. Croatia meet England today in a rematch of that 2018 semi." },
      { q: "Ghana were one missed penalty from the 2010 semi-finals after whose goal-line handball?", o: ["Diego Forlán", "Luis Suárez", "Edinson Cavani", "Diego Lugano"], a: 1, e: "Suárez punched it off the line in the last minute of extra time, Gyan hit the bar, Uruguay won the shootout. Africa still hasn't forgiven him." },
      { q: "Who won the Golden Boot at Brazil 2014 with six goals for Colombia?", o: ["Radamel Falcao", "James Rodríguez", "Juan Cuadrado", "Carlos Bacca"], a: 1, e: "Including the volley against Uruguay that won goal of the tournament. Colombia open against Uzbekistan tonight." },
      { q: "DR Congo last qualified for a World Cup in 1974, under which name?", o: ["Belgian Congo", "Congo-Kinshasa", "Katanga", "Zaire"], a: 3, e: "Zaire, the first sub-Saharan African side at a World Cup. Fifty-two years later, they face Portugal today." },
    ],
  },
};
