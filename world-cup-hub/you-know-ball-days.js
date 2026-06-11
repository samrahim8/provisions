// You Know Ball — daily banks.
// Keyed by LOCAL calendar date (matches the slate's local-day convention).
//
// Day 1 (Jun 11) shipped as five classic trivia questions — leave it.
// From Jun 12 the daily is a PENTATHLON: five rounds, one of each format,
// one star each. Round types:
//   five   — classic multiple choice            { t, q, o, a, e }
//   reveal — name the player from 1-3 clues     { t, q, clues:[3], o, a, e }
//   score  — pick the scoreline                 { t, q, o, a, e }
//   ladder — this or that                       { t, q, o:[2], a, e }
//   order  — tap 3 moments into sequence        { t, q, items:[3], order:[indices earliest->latest], e }
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
    rounds: [
      { t: "five", q: "Which World Cup still holds the all-time total attendance record?", o: ["USA 1994", "Brazil 2014", "Russia 2018", "Qatar 2022"], a: 0, e: "Nearly 3.6 million through the gates, with only 24 teams. This summer's 104-match edition is the first with a real shot at it." },
      { t: "reveal", q: "Name the player.", clues: ["Born in a refugee camp in Ghana to Liberian parents.", "Left Vancouver for Bavaria as a teenager and won a Champions League.", "Scored Canada's first ever men's World Cup goal."], o: ["Jonathan David", "Alphonso Davies", "Tajon Buchanan", "Cyle Larin"], a: 1, e: "Davies headed it in 68 seconds into Canada v Croatia in 2022. Canada open against Bosnia in Toronto today." },
      { t: "score", q: "Canada's 1986 opener against eventual semifinalists France finished:", o: ["France 1-0", "France 2-0", "1-1", "France 3-0"], a: 0, e: "Papin's 79th-minute goal was all that separated them. Canada left Mexico '86 without scoring; Davies fixed that 36 years later." },
      { t: "ladder", q: "More men's World Cup appearances, counting this one?", o: ["United States", "Mexico"], a: 1, e: "Mexico's 18th tournament this summer against the USA's 12th. Both play their openers within a day of each other." },
      { t: "order", q: "Earliest to latest:", items: ["USA host their first World Cup", "Mexico host their first World Cup", "Canada qualify for their first World Cup"], order: [1, 2, 0], e: "Mexico 1970, Canada's qualification for 1986, USA 1994. All three host together this summer." },
    ],
  },
  "2026-06-13": {
    theme: "Matchday 1",
    rounds: [
      { t: "five", q: "Which is the only nation to have appeared at every World Cup?", o: ["Germany", "Italy", "Brazil", "Argentina"], a: 2, e: "Brazil: 23 for 23 including this one. They open against Morocco at MetLife today." },
      { t: "reveal", q: "Name the player.", clues: ["His 51 international goals are still his country's record.", "Became an MP after retiring, then an exile driving rideshare in California.", "Scored the fastest goal in World Cup history: 10.8 seconds."], o: ["Rüştü Reçber", "Nihat Kahveci", "Hakan Şükür", "Emre Belözoğlu"], a: 2, e: "Şükür, straight from kickoff in the 2002 third-place match. Türkiye are back on the big stage tonight against Australia." },
      { t: "score", q: "Brazil met Morocco at France 98. It finished:", o: ["Brazil 3-0", "Brazil 2-1", "Brazil 1-0", "2-2"], a: 0, e: "Ronaldo, Rivaldo, Bebeto. Twenty-eight years later Morocco arrive as semifinalists and it's a different conversation." },
      { t: "ladder", q: "Who played in more World Cup finals, the match itself?", o: ["Cafu", "Paolo Maldini"], a: 0, e: "Cafu played in three straight finals (1994, 1998, 2002) and won two. Maldini, somehow, only ever reached the one." },
      { t: "order", q: "Earliest to latest:", items: ["Türkiye finish third", "Haiti and Australia both debut", "Archie Gemmill's wonder goal for Scotland"], order: [1, 2, 0], e: "1974, 1978, 2002. Haiti return tonight after 52 years; Scotland are still chasing a knockout round." },
    ],
  },
  "2026-06-14": {
    theme: "Matchday 1",
    rounds: [
      { t: "five", q: "The Netherlands have reached three World Cup finals: 1974, 1978, 2010. How many did they win?", o: ["0", "1", "2", "3"], a: 0, e: "None. The greatest team never to win it. They open against Japan today." },
      { t: "reveal", q: "Name the player.", clues: ["Refused the third stripe: his kit had two while his teammates wore three.", "Named a turn that no defender has solved since 1974.", "Won the Golden Ball at the only World Cup he ever played."], o: ["Johan Neeskens", "Johan Cruyff", "Willem van Hanegem", "Johnny Rep"], a: 1, e: "Cruyff unveiled the turn against Sweden in '74, on the way to a final the Dutch are still mad about." },
      { t: "score", q: "Germany's most recent World Cup final win, in 2014, finished:", o: ["1-0 after extra time", "2-1", "3-2", "2-0"], a: 0, e: "Götze's volley in the 113th. Germany open today against Curaçao, the smallest nation ever to qualify." },
      { t: "ladder", q: "More World Cup goals?", o: ["Miroslav Klose", "Gerd Müller"], a: 0, e: "Klose's 16 across four tournaments edges Müller's 14, which he scored in just 13 matches." },
      { t: "order", q: "Earliest to latest:", items: ["Japan co-host the World Cup", "Japan beat Germany and Spain in one group", "The Cruyff Turn debuts"], order: [2, 0, 1], e: "1974, 2002, 2022. Japan and the Dutch meet today at AT&T Stadium." },
    ],
  },
  "2026-06-15": {
    theme: "Matchday 1",
    rounds: [
      { t: "five", q: "'The Maracanazo' refers to Uruguay silencing 200,000 fans by beating which host in the 1950 decider?", o: ["Argentina", "Brazil", "Chile", "Mexico"], a: 1, e: "Brazil needed only a draw at home. Uruguay won 2-1, and the Maracanã went so quiet it has its own word." },
      { t: "reveal", q: "Name the player.", clues: ["Banned mid-tournament in 2014 for biting an Italian.", "His goal-line handball in 2010 broke a continent's heart.", "Uruguay's all-time top scorer."], o: ["Edinson Cavani", "Diego Forlán", "Luis Suárez", "Diego Godín"], a: 2, e: "Suárez, villain of Johannesburg and Natal. Uruguay open against Saudi Arabia today." },
      { t: "score", q: "The biggest upset of 2022, Saudi Arabia v Argentina, finished:", o: ["Saudi Arabia 2-1", "Saudi Arabia 1-0", "Saudi Arabia 3-1", "2-2"], a: 0, e: "Al-Shehri and Al-Dawsari inside five second-half minutes. Argentina didn't lose again all tournament." },
      { t: "ladder", q: "Which team went unbeaten at the 2010 World Cup?", o: ["Spain, the champions", "New Zealand"], a: 1, e: "Three draws and out for New Zealand; Spain lost their opener to Switzerland and won it all anyway. Immortal pub fact." },
      { t: "order", q: "Earliest to latest:", items: ["Belgium's golden generation takes third", "Cape Verde qualify for their first World Cup", "The Maracanazo"], order: [2, 0, 1], e: "1950, 2018, 2025. Cape Verde, population 500,000-ish, open against Spain today. Football is good." },
    ],
  },
  "2026-06-16": {
    theme: "Matchday 1",
    rounds: [
      { t: "five", q: "Who captained France to the 1998 title and then managed them to the 2018 title?", o: ["Zinedine Zidane", "Didier Deschamps", "Laurent Blanc", "Marcel Desailly"], a: 1, e: "One of three men to win it as player and manager, with Zagallo and Beckenbauer." },
      { t: "reveal", q: "Name the player.", clues: ["Born in Marseille to Algerian parents.", "Scored twice in one final and was sent off in another.", "Panenka'd Buffon in 2006, then ended his career seven minutes of madness later."], o: ["Thierry Henry", "Zinedine Zidane", "David Trezeguet", "Claude Makélélé"], a: 1, e: "Zidane, on a day France play Senegal and Argentina play Algeria. Lineage everywhere on this slate." },
      { t: "score", q: "France v Senegal, the 2002 opener, finished:", o: ["Senegal 1-0", "Senegal 2-1", "1-1", "France 2-1"], a: 0, e: "Papa Bouba Diop, and the defending champions went home without scoring a goal all tournament. Tonight: the rematch, 24 years on." },
      { t: "ladder", q: "More World Cup appearances, counting this one?", o: ["Argentina", "France"], a: 0, e: "Argentina's 19th against France's 17th. Between them: the last two titles and the greatest final ever played." },
      { t: "order", q: "Earliest to latest:", items: ["Norway beat Brazil", "Algeria and the Disgrace of Gijón", "Iraq's only World Cup"], order: [1, 2, 0], e: "1982, 1986, 1998. Algeria, Iraq, and Norway are all on today's slate. The schedule writes the quiz." },
    ],
  },
  "2026-06-17": {
    theme: "Matchday 1",
    rounds: [
      { t: "five", q: "If he features this summer, Cristiano Ronaldo will have appeared at a record how many World Cups?", o: ["4", "5", "6", "7"], a: 2, e: "2006 through 2026. Messi can match it, which tells you everything about the last twenty years." },
      { t: "reveal", q: "Name the player.", clues: ["Left Monaco for Real Madrid on the back of a single tournament.", "His chest-and-volley against Uruguay won goal of the tournament.", "Took the 2014 Golden Boot home to Colombia."], o: ["Radamel Falcao", "Juan Cuadrado", "James Rodríguez", "Carlos Valderrama"], a: 2, e: "James, six goals in five games. Colombia open against Uzbekistan tonight." },
      { t: "score", q: "England v Croatia, the 2018 semi-final, finished:", o: ["Croatia 2-1 after extra time", "Croatia 1-0", "England 2-1", "Croatia 3-1"], a: 0, e: "Trippier's free kick, then Perišić and Mandžukić turned it. They meet again today in Arlington." },
      { t: "ladder", q: "More World Cup goals for Ghana?", o: ["Asamoah Gyan", "André Ayew"], a: 0, e: "Gyan's six are the most by any African player at World Cups. Ghana start against Panama today." },
      { t: "order", q: "Earliest to latest:", items: ["Suárez's handball denies Ghana", "Modrić wins the Golden Ball", "Zaire's free-kick chaos"], order: [2, 0, 1], e: "1974, 2010, 2018. DR Congo, Ghana, and Croatia all play today." },
    ],
  },
};
