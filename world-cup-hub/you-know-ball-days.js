// You Know Ball — daily banks.
// Keyed by LOCAL calendar date (matches the slate's local-day convention).
//
// Every day is a PENTATHLON: five rounds, one of each format, one star
// each. (Legacy { questions } days still play as all-trivia.) Round types:
//   five   — classic multiple choice            { t, q, o, a, e }
//   reveal — name the player from 1-3 clues     { t, q, clues:[3], o, a, e }
//   score  — pick the scoreline                 { t, q, o, a, e }
//   ladder — this or that                       { t, q, o:[2], a, e }
//   order  — tap 3 moments into sequence        { t, q, items:[3], order:[indices earliest->latest], e }
window.YKB_DAYS = {
  "2026-06-11": {
    theme: "Opening Day",
    rounds: [
      { t: "five", q: "Mexico kicks off the tournament today. Counting this summer, how many World Cups have been staged at least partly in Mexico?", o: ["1", "2", "3", "4"], a: 2, e: "1970, 1986, and now 2026. No country had hosted three until today." },
      { t: "reveal", q: "Name the player.", clues: ["Sent home from USA 94 after a failed drug test and that wild-eyed celebration into the camera.", "Scored twice in a 1986 quarter-final, four minutes apart: one with his hand, one with his feet.", "Both of those goals happened in the stadium hosting tonight's opener."], o: ["Pelé", "Diego Maradona", "Romário", "Hugo Sánchez"], a: 1, e: "The Hand of God and the Goal of the Century, both at the Azteca, both against England. Tonight that pitch opens its third World Cup." },
      { t: "score", q: "Today's opener is a rematch: South Africa v Mexico opened the 2010 World Cup. It finished:", o: ["1-1", "South Africa 1-0", "Mexico 2-1", "0-0"], a: 0, e: "Tshabalala's rocket and the corner-flag dance, then Márquez equalized. Sixteen years later they go again." },
      { t: "year", q: "The first World Cup final ever decided on penalties: Brazil v Italy in Pasadena, Baggio over the bar. Lock the year.", a: 1994, e: "The Rose Bowl, 94. The summer this whole tournament is chasing." },
      { t: "order", q: "Earliest to latest:", items: ["South Korea reach a semifinal", "Mexico host for the first time", "The Azteca stages its second final"], order: [1, 2, 0], e: "1970, 1986, 2002. Tonight the Azteca era gets a third act." },
    ],
  },
  "2026-06-12": {
    theme: "Matchday 1",
    rounds: [
      { t: "five", q: "Which World Cup still holds the all-time total attendance record?", o: ["USA 1994", "Brazil 2014", "Russia 2018", "Qatar 2022"], a: 0, e: "Nearly 3.6 million through the gates, with only 24 teams. This summer's 104-match edition is the first with a real shot at it." },
      { t: "reveal", q: "Name the player.", clues: ["Scored in the 'dos a cero' knockout win over Mexico in 2002.", "His 91st-minute goal against Algeria in 2010 is the most replayed moment in American soccer.", "The USMNT's joint all-time top scorer."], o: ["Clint Dempsey", "Landon Donovan", "Brian McBride", "DaMarcus Beasley"], a: 1, e: "Donovan, 57 goals, level with Dempsey. The USA open against Paraguay tonight; somebody new gets a moment like Algeria." },
      { t: "score", q: "The Miracle on Grass: the USA met England at the 1950 World Cup in Belo Horizonte. It finished:", o: ["USA 1-0", "1-1", "USA 2-1", "England 1-0"], a: 0, e: "Joe Gaetjens, a Haitian-born dishwasher from New York, scored the only goal. Still the upset every American run is measured against — and Haiti play this weekend." },
      { t: "year", q: "France win their first World Cup, two Zidane headers in the final. Lock the year.", a: 1998, e: "Paris, 3-0 over Brazil. Deschamps lifted it as captain; he has managed them ever since 2012." },
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
  "2026-06-24": {
    theme: "Goal Machines",
    rounds: [
      { t: "five", q: "For eight years this man held the record as the World Cup's all-time top scorer with 15 goals, until Miroslav Klose passed him in 2014. Who?", o: ["Pelé", "Ronaldo (Brazil)", "Gerd Müller", "Just Fontaine"], a: 1, e: "Brazil's Ronaldo overtook Müller's 14 with his 15th goal against Ghana in 2006. Klose finally went past him with his 16th in 2014." },
      { t: "reveal", q: "Name the player.", clues: ["Born in Marrakesh, capped by France.", "Holds a single-tournament record untouched for nearly 70 years.", "Scored 13 goals at one World Cup, in 1958."], o: ["Raymond Kopa", "Just Fontaine", "Michel Platini", "Thierry Henry"], a: 1, e: "Fontaine's 13 in Sweden '58 is the most goals anyone has scored at a single World Cup. Nobody has come within four since." },
      { t: "score", q: "The highest-scoring match in World Cup history, Austria v Switzerland in the 1954 quarter-final, finished:", o: ["Austria 7-5", "5-5", "Austria 6-4", "Switzerland 6-3"], a: 0, e: "Twelve goals in 40°C heat, the 'Heat Battle of Lausanne.' Austria came back from 3-0 down inside the first half." },
      { t: "year", q: "Geoff Hurst scores the only hat-trick in a men's World Cup final. Lock the year.", a: 1966, e: "England 4-2 West Germany at Wembley, after extra time. 'They think it's all over...'" },
      { t: "order", q: "Earliest to latest:", items: ["Just Fontaine scores 13 in one tournament", "Ronaldo breaks the all-time scoring record", "Klose breaks Ronaldo's record"], order: [0, 1, 2], e: "1958, 2006, 2014. The record passes from France to Brazil to Germany." },
    ],
  },
  "2026-06-25": {
    theme: "The Last Line",
    rounds: [
      { t: "five", q: "Who is the only goalkeeper ever to win the World Cup Golden Ball as the tournament's best player?", o: ["Lev Yashin", "Oliver Kahn", "Gianluigi Buffon", "Iker Casillas"], a: 1, e: "Kahn in 2002, even though Brazil beat his Germany in the final, and even though his fumble teed up the winner." },
      { t: "reveal", q: "Name the player.", clues: ["Kept goal for the Soviet Union.", "Nicknamed the 'Black Spider.'", "The only goalkeeper to win the Ballon d'Or."], o: ["Rinat Dasayev", "Lev Yashin", "Dino Zoff", "Gordon Banks"], a: 1, e: "Yashin took the Ballon d'Or in 1963. No keeper has done it before or since." },
      { t: "score", q: "Gordon Banks made 'the save of the century' from Pelé in a 1970 group game. Brazil still won it:", o: ["Brazil 1-0", "1-1", "Brazil 2-1", "Brazil 2-0"], a: 0, e: "Jairzinho got the only goal, but it's the save, not the result, that everyone remembers." },
      { t: "ladder", q: "Who was older on the day he lifted the World Cup as captain?", o: ["Dino Zoff, 1982", "Iker Casillas, 2010"], a: 0, e: "Zoff was 40, still the oldest World Cup winner ever. Casillas was a sprightly 29 in Johannesburg." },
      { t: "order", q: "Earliest to latest:", items: ["Yashin wins the Ballon d'Or", "Zoff lifts the World Cup at 40", "Casillas captains Spain to the title"], order: [0, 1, 2], e: "1963, 1982, 2010. Three goalkeepers, three kinds of immortality." },
    ],
  },
  "2026-06-26": {
    theme: "Home Soil",
    rounds: [
      { t: "five", q: "How many host nations have gone on to win the World Cup on their own soil?", o: ["Three", "Four", "Six", "Eight"], a: 2, e: "Uruguay (1930), Italy (1934), England (1966), West Germany (1974), Argentina (1978) and France (1998). Six hosts, six trophies." },
      { t: "reveal", q: "Name the player.", clues: ["Played his club football in Spain at the time.", "Top scorer at the 1978 World Cup with six goals.", "Scored twice in the final for the host nation."], o: ["Daniel Passarella", "Leopoldo Luque", "Mario Kempes", "Osvaldo Ardiles"], a: 2, e: "Kempes, 'El Matador': six goals, two in the final, and the Golden Ball as Argentina won at home in '78." },
      { t: "score", q: "England's one and only World Cup final, in 1966, finished:", o: ["England 4-2 after extra time", "England 3-2", "2-2", "England 2-0"], a: 0, e: "Hurst's hat-trick saw off West Germany at Wembley. Still the only time England have gone all the way." },
      { t: "year", q: "Host nation Brazil suffer the 7-1 'Mineirazo' in a home semi-final against Germany. Lock the year.", a: 2014, e: "Belo Horizonte. Five goals in 29 first-half minutes. A nation's worst nightmare on its own soil." },
      { t: "order", q: "Earliest to latest:", items: ["Uruguay win the first World Cup as hosts", "England win as hosts", "France win as hosts"], order: [0, 1, 2], e: "1930, 1966, 1998. Winning at home is rare, and nobody's done it since France." },
    ],
  },
  "2026-06-27": {
    theme: "Wonder Goals",
    rounds: [
      { t: "five", q: "Whose 24-pass team goal against Serbia and Montenegro in 2006 got labelled 'a monument of geometry'?", o: ["Lionel Messi", "Esteban Cambiasso", "Juan Román Riquelme", "Hernán Crespo"], a: 1, e: "Cambiasso finished a 24-pass move off a Crespo backheel in a 6-0 Argentina rout. Almost the whole team touched it first." },
      { t: "reveal", q: "Name the player.", clues: ["Played for Saudi Arabia.", "His goal at USA '94 got called the 'Maradona of the Arabs.'", "He carried the ball past half of Belgium to score the winner."], o: ["Majed Abdullah", "Sami Al-Jaber", "Saeed Al-Owairan", "Yasser Al-Qahtani"], a: 2, e: "Al-Owairan's 60-yard solo run beat Belgium 1-0 in 1994 and put Saudi Arabia into the knockouts." },
      { t: "score", q: "Brazil's 1970 final, capped by Carlos Alberto's perfect team goal, finished against Italy:", o: ["Brazil 4-1", "Brazil 3-1", "Brazil 4-2", "2-2"], a: 0, e: "The greatest team goal by maybe the greatest team. Pelé's lay-off, Carlos Alberto's thunderbolt, 4-1." },
      { t: "ladder", q: "Whose World Cup wonder goal came first?", o: ["Archie Gemmill v Netherlands, Scotland", "Maxi Rodríguez v Mexico, Argentina"], a: 0, e: "Gemmill's slalom was 1978 (yes, the Trainspotting one). Maxi's extra-time volley came in 2006." },
      { t: "order", q: "Earliest to latest:", items: ["Carlos Alberto's team goal", "Archie Gemmill's slalom run", "Cambiasso's 24-pass finish"], order: [0, 1, 2], e: "1970, 1978, 2006. Three goals that still get replayed every four years." },
    ],
  },
  "2026-06-28": {
    theme: "The Bosses",
    rounds: [
      { t: "five", q: "Three men have won the World Cup as both a player and a manager. Which of these is NOT one of them?", o: ["Franz Beckenbauer", "Mário Zagallo", "Didier Deschamps", "Johan Cruyff"], a: 3, e: "Beckenbauer, Zagallo and Deschamps did the double. Cruyff, for all his genius, never won a World Cup at all." },
      { t: "reveal", q: "Name the player.", clues: ["Nicknamed 'Der Kaiser.'", "Captained West Germany to the 1974 title.", "Managed West Germany to the 1990 title."], o: ["Lothar Matthäus", "Franz Beckenbauer", "Paul Breitner", "Uwe Seeler"], a: 1, e: "Beckenbauer lifted it as captain in '74 and again from the dugout in '90, and reinvented the sweeper along the way." },
      { t: "score", q: "The 1990 final, a bad-tempered rematch of '86, finished West Germany v Argentina:", o: ["West Germany 1-0", "2-1", "1-1", "West Germany 2-0"], a: 0, e: "Brehme's late penalty settled it. Two Argentina players were sent off; nobody calls it a classic." },
      { t: "ladder", q: "Who won more World Cup titles as a manager?", o: ["Vittorio Pozzo", "Mário Zagallo"], a: 0, e: "Pozzo is the only manager to win two (Italy, 1934 and 1938). Zagallo won one in the dugout, in 1970." },
      { t: "order", q: "Earliest to latest:", items: ["Pozzo wins back-to-back titles", "Beckenbauer wins as captain", "Deschamps wins as captain"], order: [0, 1, 2], e: "1938, 1974, 1998. Three different ways to put your name on the trophy." },
    ],
  },
  "2026-06-29": {
    theme: "Twelve Yards",
    rounds: [
      { t: "five", q: "Who scored the decisive penalty in the 2006 final shootout to win Italy their fourth World Cup?", o: ["Andrea Pirlo", "Fabio Grosso", "Alessandro Del Piero", "Marco Materazzi"], a: 1, e: "Grosso, who wasn't even on the original list of takers. Lippi told him, 'You're the man for the last minute.'" },
      { t: "reveal", q: "Name the player.", clues: ["The ponytail, the Buddhism, 'Il Divin Codino.'", "Dragged Italy to the 1994 final almost by himself.", "Then ballooned the penalty that handed Brazil the trophy."], o: ["Paolo Rossi", "Roberto Baggio", "Gianfranco Zola", "Roberto Donadoni"], a: 1, e: "Baggio's miss in Pasadena ended the first World Cup final ever decided on penalties." },
      { t: "score", q: "Before the shootout, the 2006 final between Italy and France was level at:", o: ["1-1", "2-1", "0-0", "2-2"], a: 0, e: "Materazzi cancelled Zidane's cheeky Panenka, then drew the headbutt that ended Zidane's career." },
      { t: "ladder", q: "Who has the better World Cup penalty-shootout record?", o: ["Germany", "Argentina"], a: 0, e: "Germany have never lost one: four shootouts, 18 of 18 kicks scored. Argentina have lost one, to (who else) Germany in 2006." },
      { t: "order", q: "Earliest to latest:", items: ["The first World Cup penalty shootout", "The first final decided on penalties", "Zidane's headbutt final"], order: [0, 1, 2], e: "1982, 1994, 2006. The shootout went from novelty to heartbreak machine fast." },
    ],
  },
  "2026-06-30": {
    theme: "Teenage Kicks",
    rounds: [
      { t: "five", q: "Who is the youngest goalscorer in World Cup history, and the only man to score at one before turning 18?", o: ["Pelé", "Kylian Mbappé", "Michael Owen", "Lionel Messi"], a: 0, e: "Pelé, 17 years 239 days, against Wales in 1958. Days later he scored a semi-final hat-trick, then twice in the final." },
      { t: "reveal", q: "Name the player.", clues: ["France's spearhead since 2018.", "The second teenager ever to score in a World Cup final, after Pelé.", "Scored a hat-trick in a World Cup final and still lost."], o: ["Antoine Griezmann", "Olivier Giroud", "Kylian Mbappé", "Karim Benzema"], a: 2, e: "Mbappé's three goals in the 2022 final weren't enough; Argentina won the shootout 4-2." },
      { t: "score", q: "After 120 minutes, the 2022 final between Argentina and France finished:", o: ["3-3", "2-2", "3-2", "4-3"], a: 0, e: "Messi twice, Di María once; Mbappé all three for France. Then Argentina held their nerve from the spot." },
      { t: "year", q: "Pelé becomes the only man to win three World Cups. Lock the year of his third.", a: 1970, e: "1958, 1962 and 1970, and that '70 Brazil side is still the benchmark for the beautiful game." },
      { t: "order", q: "Earliest to latest:", items: ["Pelé wins the World Cup as a 17-year-old", "Mbappé scores in a final as a teenager", "Mbappé scores a hat-trick in a final"], order: [0, 1, 2], e: "1958, 2018, 2022. Sixty years apart, the same impossible standard." },
    ],
  },
  "2026-07-01": {
    theme: "Sudden Death",
    rounds: [
      { t: "five", q: "The 'golden goal' meant the first side to score in extra time won on the spot. Who scored the first one in World Cup history?", o: ["Davor Šuker", "Laurent Blanc", "Oliver Bierhoff", "David Trezeguet"], a: 1, e: "Blanc settled France's 1998 Round of 16 tie with Paraguay in the 114th minute, the first golden goal the World Cup had ever seen." },
      { t: "reveal", q: "Name the player.", clues: ["Co-hosted the 2002 World Cup with his country.", "His golden goal in the Round of 16 dumped out Italy.", "His Italian club Perugia tore up his contract in a rage afterwards."], o: ["Park Ji-sung", "Ahn Jung-hwan", "Cha Bum-kun", "Hong Myung-bo"], a: 1, e: "Ahn's extra-time header beat Italy 2-1 in 2002. Perugia's furious chairman vowed never to play 'a man who ruined Italian football' again." },
      { t: "score", q: "That South Korea v Italy Round of 16 tie in 2002 finished:", o: ["South Korea 2-1", "1-1", "South Korea 1-0", "South Korea 3-2"], a: 0, e: "Vieri put Italy ahead, Seol equalised with two minutes left, and Ahn won it in extra time amid huge controversy." },
      { t: "year", q: "FIFA used the golden goal at a World Cup for the very first time. Lock the year.", a: 1998, e: "Brought in to reward attacking extra time, it lasted only two World Cups before being scrapped." },
      { t: "order", q: "Earliest to latest:", items: ["The first World Cup golden goal", "Ahn's golden goal sinks Italy", "FIFA abolishes the golden goal"], order: [0, 1, 2], e: "1998, 2002, 2004. A neat idea that didn't last." },
    ],
  },
  "2026-07-02": {
    theme: "Giant Killers",
    rounds: [
      { t: "five", q: "One of the great World Cup shocks: which team beat England 1-0 in the 1950 group stage?", o: ["United States", "Chile", "Spain", "Uruguay"], a: 0, e: "A part-time US side won in Belo Horizonte through Joe Gaetjens. Some English papers reportedly assumed the 1-0 was a misprint for 10-1." },
      { t: "reveal", q: "Name the nation.", clues: ["Opened the 1990 World Cup against the holders.", "Won it 1-0 while finishing the match with nine men.", "Roger Milla and his corner-flag dance lit up the same tournament."], o: ["Senegal", "Cameroon", "Nigeria", "Ghana"], a: 1, e: "Cameroon stunned Maradona's Argentina in the 1990 opener; Omam-Biyik's header squirmed under the keeper." },
      { t: "score", q: "Senegal's shock over defending champions France in the 2002 opener finished:", o: ["Senegal 1-0", "1-1", "Senegal 2-1", "Senegal 2-0"], a: 0, e: "Papa Bouba Diop bundled in the winner. France went home pointless, scoreless and bottom of the group." },
      { t: "year", q: "North Korea beat Italy 1-0 to reach the quarter-finals. Lock the year.", a: 1966, e: "Pak Doo-ik's strike at Middlesbrough is still one of the World Cup's biggest upsets." },
      { t: "order", q: "Earliest to latest:", items: ["USA beat England", "North Korea beat Italy", "Cameroon beat Argentina"], order: [0, 1, 2], e: "1950, 1966, 1990. Favourites felled by part-timers and debutants." },
    ],
  },
  "2026-07-03": {
    theme: "Last Sixteen",
    rounds: [
      { t: "five", q: "Whose 119th-minute volley sent England past Belgium in the 1990 second round, seconds from a shootout?", o: ["Gary Lineker", "David Platt", "Paul Gascoigne", "Peter Beardsley"], a: 1, e: "Platt swivelled onto Gascoigne's lofted free kick and volleyed in with almost the last touch of extra time." },
      { t: "reveal", q: "Name the player.", clues: ["An 18-year-old Liverpool striker.", "Ran from inside his own half and beat two Argentina defenders.", "His 1998 finish announced him to the world."], o: ["Robbie Fowler", "Michael Owen", "Emile Heskey", "Teddy Sheringham"], a: 1, e: "Owen's wonder goal lit up the 1998 Round of 16, though England still went out on penalties after Beckham's red card." },
      { t: "score", q: "England v Argentina in the 1998 Round of 16 finished, after extra time:", o: ["2-2", "1-1", "3-2", "2-1"], a: 0, e: "Batistuta and Zanetti for Argentina; Shearer and Owen for England. Argentina won the shootout 4-3 after Beckham was sent off." },
      { t: "year", q: "Maxi Rodríguez ends an Argentina v Mexico second-round classic with an extra-time volley. Lock the year.", a: 2006, e: "A left-footed thunderbolt into the top corner in Leipzig, one of the goals of the tournament." },
      { t: "order", q: "Earliest to latest:", items: ["Platt's last-gasp volley v Belgium", "Owen's solo run v Argentina", "Maxi's extra-time volley v Mexico"], order: [0, 1, 2], e: "1990, 1998, 2006. The Round of 16 does drama better than anyone." },
    ],
  },
  "2026-07-04": {
    theme: "The Comeback",
    rounds: [
      { t: "five", q: "Portugal came from 3-0 down to win 5-3 at the 1966 World Cup, with one man scoring four. Against whom?", o: ["North Korea", "Brazil", "Hungary", "Bulgaria"], a: 0, e: "North Korea raced 3-0 ahead inside 25 minutes; Eusébio answered with four goals to turn the quarter-final around." },
      { t: "reveal", q: "Name the player.", clues: ["Born in Mozambique, the 'Black Panther.'", "Won the 1966 Golden Boot with nine goals.", "Scored four in one knockout game to complete a 3-0 comeback."], o: ["Mário Coluna", "Eusébio", "José Torres", "Pelé"], a: 1, e: "Eusébio left the field in tears when Portugal lost the semi-final to hosts England days later." },
      { t: "score", q: "That Portugal comeback against North Korea in the 1966 quarter-final finished:", o: ["Portugal 5-3", "4-3", "Portugal 5-2", "4-2"], a: 0, e: "Down 3-0 after 25 minutes, Portugal scored five, four of them from Eusébio." },
      { t: "ladder", q: "Which was the steeper World Cup knockout comeback?", o: ["Portugal from 3-0 down v North Korea, 1966", "West Germany from 2-0 down v England, 1970"], a: 0, e: "Both stunned the favourites, but climbing back from three goals down is the rarer feat." },
      { t: "order", q: "Earliest to latest:", items: ["Eusébio drags Portugal back from 3-0", "West Germany recover to beat England", "Belgium come from 2-0 down to beat Japan"], order: [0, 1, 2], e: "1966, 1970, 2018. The knockouts reward whoever keeps believing." },
    ],
  },
  "2026-07-05": {
    theme: "Seeing Red",
    rounds: [
      { t: "five", q: "Who received the first red card ever shown in a World Cup final, in 1990?", o: ["Pedro Monzón (Argentina)", "Diego Maradona (Argentina)", "Marco Materazzi (Italy)", "Frank Rijkaard (Netherlands)"], a: 0, e: "Argentina's Monzón was dismissed against West Germany; team-mate Dezotti soon joined him. The first final to see red, twice over." },
      { t: "reveal", q: "Name the player.", clues: ["England's young talisman in 2006.", "Stamped on Ricardo Carvalho in the quarter-final.", "Ronaldo's wink to the bench followed his red card."], o: ["Steven Gerrard", "Wayne Rooney", "Frank Lampard", "Michael Owen"], a: 1, e: "Rooney saw red against Portugal in 2006; England lost on penalties, and the Rooney-Ronaldo club rivalry got a new chapter." },
      { t: "score", q: "That 2006 England v Portugal quarter-final, Rooney's red and all, finished after extra time:", o: ["0-0", "1-1", "1-0 Portugal", "2-1 Portugal"], a: 0, e: "Goalless, then Portugal won the shootout 3-1 as England missed three penalties." },
      { t: "year", q: "Referee Valentin Ivanov shows 16 yellows and four reds in the 'Battle of Nuremberg.' Lock the year.", a: 2006, e: "Portugal beat the Netherlands 1-0 in a Round of 16 tie that set a World Cup record for cards." },
      { t: "order", q: "Earliest to latest:", items: ["First red card in a World Cup final", "The Battle of Nuremberg", "Rooney's stamp gets him sent off"], order: [0, 1, 2], e: "1990, then two ugly afternoons in 2006. The knockouts bring out the temper." },
    ],
  },
  "2026-07-06": {
    theme: "Off the Bench",
    rounds: [
      { t: "five", q: "Who came on as a substitute and scored the winning goal in the 2014 World Cup final?", o: ["Thomas Müller", "André Schürrle", "Mario Götze", "Miroslav Klose"], a: 2, e: "Götze, on for Klose, chested down Schürrle's cross and volleyed past Romero in extra time. Germany 1-0 Argentina." },
      { t: "reveal", q: "Name the player.", clues: ["Australia's midfield talisman.", "Came off the bench at the 2006 World Cup against Japan.", "Scored twice in the last eight minutes for his country's first-ever World Cup win."], o: ["Harry Kewell", "Tim Cahill", "Mark Viduka", "Mark Bresciano"], a: 1, e: "Cahill's double in 2006 turned a 1-0 deficit into a 3-1 win, Australia's first victory at a World Cup finals." },
      { t: "score", q: "Tim Cahill's super-sub double turned Australia's 2006 opener against Japan into:", o: ["Australia 3-1", "2-1 Australia", "1-1", "3-2 Australia"], a: 0, e: "Three goals in the last eight minutes: two from Cahill, one from Aloisi." },
      { t: "year", q: "Mario Götze's substitute's volley wins the World Cup final for Germany. Lock the year.", a: 2014, e: "Seven minutes from a shootout, the 22-year-old settled it against Argentina at the Maracanã." },
      { t: "order", q: "Earliest to latest:", items: ["Roger Milla dances at the corner flag, aged 38", "Tim Cahill's super-sub double", "Götze wins the final off the bench"], order: [0, 1, 2], e: "1990, 2006, 2014. Games are won by whoever's freshest at the end." },
    ],
  },
  "2026-07-07": {
    theme: "The Magicians",
    rounds: [
      { t: "five", q: "Whose two goals in four minutes against England in 1986 included both the 'Hand of God' and the 'Goal of the Century'?", o: ["Diego Maradona", "Jorge Valdano", "Jorge Burruchaga", "Daniel Passarella"], a: 0, e: "Maradona punched the first past Shilton, then slalomed through half of England for the second. Same man, same six minutes." },
      { t: "reveal", q: "Name the player.", clues: ["Argentina's captain and talisman.", "Won the World Cup Golden Ball as best player at two different tournaments.", "Finally lifted the trophy in 2022, at the fifth attempt."], o: ["Ángel Di María", "Lionel Messi", "Sergio Agüero", "Paulo Dybala"], a: 1, e: "Messi's 2022 was the coronation: seven goals, two career Golden Balls, and the trophy at last." },
      { t: "score", q: "The 1986 quarter-final between Argentina and England, settled by Maradona's two goals, finished:", o: ["Argentina 2-1", "2-2", "Argentina 2-0", "Argentina 3-1"], a: 0, e: "Lineker pulled one back late, but Maradona's double had already decided it." },
      { t: "ladder", q: "Who won more World Cup Golden Balls (player of the tournament)?", o: ["Diego Maradona", "Lionel Messi"], a: 1, e: "Messi took it in 2014 and 2022; Maradona won it once, in 1986. Two icons, one shared number." },
      { t: "order", q: "Earliest to latest:", items: ["Maradona's two goals beat England", "Zidane's France win on home soil", "Messi lifts the World Cup at last"], order: [0, 1, 2], e: "1986, 1998, 2022. Three number 10s, three eras." },
    ],
  },
  "2026-07-08": {
    theme: "Brazil, the Benchmark",
    rounds: [
      { t: "five", q: "How many times have Brazil won the World Cup, more than any other nation?", o: ["Four", "Five", "Six", "Three"], a: 1, e: "Five: 1958, 1962, 1970, 1994 and 2002. They are also the only nation to play at every finals." },
      { t: "reveal", q: "Name the player.", clues: ["Born with a curved spine and bowed legs.", "Brazil never lost a match while he and Pelé both started.", "Carried Brazil to the 1962 title with Pelé injured early."], o: ["Garrincha", "Didi", "Vavá", "Jairzinho"], a: 0, e: "Garrincha, the 'Little Bird,' was the player of the 1962 tournament, dragging Brazil to the title almost single-handedly after Pelé got hurt." },
      { t: "score", q: "Brazil's 1958 final win over hosts Sweden, with a 17-year-old Pelé scoring twice, finished:", o: ["Brazil 5-2", "4-1", "Brazil 5-1", "3-2"], a: 0, e: "Pelé's two and Vavá's two saw Brazil win 5-2 in Stockholm, their first world title." },
      { t: "year", q: "Brazil win their fifth World Cup, beating Germany in the final. Lock the year.", a: 2002, e: "Ronaldo scored both goals in Yokohama, redemption after his nightmare 1998 final." },
      { t: "order", q: "Earliest to latest:", items: ["Brazil's first title, in Sweden", "Garrincha carries Brazil with Pelé hurt", "Brazil's fifth star, in Japan"], order: [0, 1, 2], e: "1958, 1962, 2002. Nobody wears the crown more often." },
    ],
  },
  "2026-07-09": {
    theme: "The Final Eight",
    rounds: [
      { t: "five", q: "Whose last-minute touch, turn and finish knocked Argentina out of the 1998 quarter-finals?", o: ["Dennis Bergkamp", "Marc Overmars", "Patrick Kluivert", "Edgar Davids"], a: 0, e: "Bergkamp killed a long de Boer pass dead, spun his marker and finished, all in three touches, in the 90th minute at Marseille." },
      { t: "reveal", q: "Name the player.", clues: ["Dutch playmaker, all left foot.", "Tied for top scorer at the 2010 World Cup with five goals.", "Drove the Netherlands to the final, scoring in the quarter and the semi."], o: ["Arjen Robben", "Wesley Sneijder", "Rafael van der Vaart", "Robin van Persie"], a: 1, e: "Sneijder's five goals took the Dutch to the 2010 final, where they lost to Spain." },
      { t: "score", q: "The Netherlands knocked favourites Brazil out of the 2010 quarter-finals, coming from a goal down to win:", o: ["2-1", "1-0", "3-1", "2-0"], a: 0, e: "Sneijder scored twice after Robinho's opener, the first deflecting in off Felipe Melo, who then got himself sent off as Brazil fell apart." },
      { t: "ladder", q: "Which country has reached more World Cup semi-finals?", o: ["Germany", "Brazil"], a: 0, e: "Germany, including West Germany, have reached the last four a record 13 times, just ahead of Brazil." },
      { t: "order", q: "Earliest to latest:", items: ["Bergkamp's touch beats Argentina", "The Netherlands knock out Brazil", "Croatia stun Brazil on penalties"], order: [0, 1, 2], e: "1998, 2010, 2022. The quarter-finals are where favourites get found out." },
    ],
  },
  "2026-07-10": {
    theme: "Penalty Kings",
    rounds: [
      { t: "five", q: "Which goalkeeper saved two penalties in the 2006 quarter-final shootout to send Germany through against Argentina?", o: ["Jens Lehmann", "Oliver Kahn", "Manuel Neuer", "Robert Enke"], a: 0, e: "Lehmann, with a crib note tucked in his sock, saved from Ayala and Cambiasso. Germany's penalty mythology grew again." },
      { t: "reveal", q: "Name the player.", clues: ["A Ghanaian striker.", "Smashed a last-minute penalty off the bar in the 2010 quarter-final.", "Then bravely took, and scored, in the shootout his country still lost."], o: ["Sulley Muntari", "Asamoah Gyan", "Kevin-Prince Boateng", "André Ayew"], a: 1, e: "Gyan's 120th-minute miss came right after Suárez's goal-line handball; Ghana's heartbreak was complete in the shootout." },
      { t: "score", q: "Before that shootout, Uruguay v Ghana in the 2010 quarter-final was level at:", o: ["1-1", "0-0", "2-2", "2-1"], a: 0, e: "Muntari for Ghana, Forlán for Uruguay; then Suárez's handball and Gyan's miss made it a shootout." },
      { t: "year", q: "Goalkeeper Jens Lehmann's sock note helps Germany beat Argentina on penalties. Lock the year.", a: 2006, e: "The note listed where each Argentine liked to aim. It worked." },
      { t: "order", q: "Earliest to latest:", items: ["The first World Cup penalty shootout", "Lehmann's sock note beats Argentina", "Gyan's miss breaks Ghana's heart"], order: [0, 1, 2], e: "1982, 2006, 2010. No format breaks more hearts." },
    ],
  },
  "2026-07-11": {
    theme: "Heavyweight Bouts",
    rounds: [
      { t: "five", q: "Italy beat West Germany 4-3 in a 1970 semi-final with five extra-time goals. It is remembered as the 'Game of the...'?", o: ["Century", "Ages", "Gods", "Giants"], a: 0, e: "A plaque at the Azteca still marks it: five goals in extra time, Italy edging it 4-3 to reach the final." },
      { t: "reveal", q: "Name the player.", clues: ["Italian striker, just back from a betting ban.", "Scored a hat-trick to knock out the great Brazil side of 1982.", "Finished that World Cup as top scorer, and a winner."], o: ["Paolo Rossi", "Bruno Conti", "Marco Tardelli", "Francesco Graziani"], a: 0, e: "Rossi's hat-trick beat Brazil 3-2 in one of the most celebrated knockout games ever, and he didn't stop there." },
      { t: "score", q: "Italy's classic 1982 second-round win over Brazil, Rossi's hat-trick and all, finished:", o: ["Italy 3-2", "2-1 Italy", "3-1 Italy", "2-2"], a: 0, e: "Brazil only needed a draw; they kept attacking, and Rossi punished them three times." },
      { t: "year", q: "Italy and West Germany play out the 'Game of the Century.' Lock the year.", a: 1970, e: "Played in the thin air of Mexico City; both sides were running on empty by the end." },
      { t: "order", q: "Earliest to latest:", items: ["The Game of the Century", "Rossi's hat-trick sinks Brazil", "Italy lift the trophy in Spain"], order: [0, 1, 2], e: "1970, then two steps of Italy's 1982 fairytale." },
    ],
  },
  "2026-07-12": {
    theme: "The Long Wait",
    rounds: [
      { t: "five", q: "Which country waited until 2010 to win their first World Cup, beating the Netherlands in the final?", o: ["Spain", "Portugal", "Belgium", "Croatia"], a: 0, e: "Iniesta's extra-time goal in Johannesburg gave Spain a first World Cup at the 19th attempt." },
      { t: "reveal", q: "Name the player.", clues: ["Spain's quiet midfield genius.", "Scored the only goal of the 2010 final.", "Revealed a shirt reading 'Dani Jarque, siempre con nosotros.'"], o: ["Xavi", "Andrés Iniesta", "David Villa", "Cesc Fàbregas"], a: 1, e: "Iniesta's 116th-minute volley won Spain their first World Cup and honoured his late friend." },
      { t: "score", q: "Spain's first World Cup final, against the Netherlands in 2010, finished after extra time:", o: ["Spain 1-0", "2-1 Spain", "1-1", "2-0 Spain"], a: 0, e: "A bruising, card-strewn final settled by Iniesta with four minutes left." },
      { t: "year", q: "France win their first World Cup, on home soil. Lock the year.", a: 1998, e: "Zidane's two headers beat Brazil 3-0 in Paris; les Bleus had finally arrived." },
      { t: "order", q: "Earliest to latest:", items: ["England win their first and only title", "France win their first title", "Spain win their first title"], order: [0, 1, 2], e: "1966, 1998, 2010. Some nations wait generations for one." },
    ],
  },
  "2026-07-13": {
    theme: "Old Enemies",
    rounds: [
      { t: "five", q: "The 'Battle of Santiago' in 1962 was a brutal group game between Chile and which country?", o: ["Italy", "Brazil", "Argentina", "Spain"], a: 0, e: "Two Italians were sent off and police came onto the pitch three times; Chile won 2-0 in one of football's ugliest matches." },
      { t: "reveal", q: "Name the player.", clues: ["A Dutch midfielder.", "Spat in Rudi Völler's perm during a 1990 grudge match.", "Both he and the German were sent off for it."], o: ["Ruud Gullit", "Frank Rijkaard", "Ronald Koeman", "Jan Wouters"], a: 1, e: "Rijkaard's spat at Völler in the 1990 Netherlands v West Germany tie is one of the World Cup's nastiest moments." },
      { t: "score", q: "West Germany beat the Netherlands in that bad-tempered 1990 second-round tie:", o: ["2-1", "1-0", "2-0", "3-1"], a: 0, e: "Klinsmann and Brehme scored; the Dutch, the reigning European champions, went home early." },
      { t: "year", q: "Maradona's two goals beat England at the World Cup, four years after the Falklands War. Lock the year.", a: 1986, e: "Politics and football collided in Mexico City; Maradona never hid that it felt like more than a game." },
      { t: "order", q: "Earliest to latest:", items: ["The Battle of Santiago", "Maradona's two goals beat England", "Rijkaard spits at Völler"], order: [0, 1, 2], e: "1962, 1986, 1990. The World Cup keeps its grudges." },
    ],
  },
  "2026-07-14": {
    theme: "One Game From Glory",
    rounds: [
      { t: "five", q: "Germany's 7-1 demolition of hosts Brazil came at which stage of the 2014 World Cup?", o: ["Semi-final", "Quarter-final", "Final", "Round of 16"], a: 0, e: "The 'Mineirazo': five goals in 29 first-half minutes ended Brazil's dream in the last four." },
      { t: "reveal", q: "Name the player.", clues: ["West Germany's goalkeeper in 1982.", "Flattened France's Patrick Battiston with a brutal challenge in the semi-final.", "Wasn't even booked, then saved two penalties in the shootout."], o: ["Sepp Maier", "Harald Schumacher", "Bodo Illgner", "Eike Immel"], a: 1, e: "Schumacher's assault on Battiston went unpunished; West Germany won the shootout to reach the 1982 final." },
      { t: "score", q: "France and West Germany were level after extra time in that 1982 semi-final, the first World Cup knockout decided on penalties. The shootout went:", o: ["West Germany 5-4", "5-3", "4-3", "4-2"], a: 0, e: "Seville, 1982: France led 3-1 in extra time and still lost the first World Cup shootout, 5-4." },
      { t: "year", q: "Germany humiliate hosts Brazil 7-1 in a World Cup semi-final. Lock the year.", a: 2014, e: "Belo Horizonte fell silent, then started applauding Germany. A nation's worst night." },
      { t: "order", q: "Earliest to latest:", items: ["Schumacher flattens Battiston in Seville", "Italy beat Germany in Dortmund", "Germany's 7-1 over Brazil"], order: [0, 1, 2], e: "1982, 2006, 2014. The semi-finals make and break legends." },
    ],
  },
  "2026-07-15": {
    theme: "So Near",
    rounds: [
      { t: "five", q: "The Netherlands have lost three World Cup finals without ever winning. In which years?", o: ["1974, 1978, 2010", "1974, 1990, 2010", "1978, 1998, 2010", "1974, 1978, 1998"], a: 0, e: "Beaten by West Germany (1974), Argentina (1978) and Spain (2010). Total Football's nearly men." },
      { t: "reveal", q: "Name the player.", clues: ["The face of Total Football.", "Won the Ballon d'Or three times but never a World Cup.", "Sat out the 1978 tournament his country reached the final of."], o: ["Johan Neeskens", "Johan Cruyff", "Rob Rensenbrink", "Ruud Krol"], a: 1, e: "Cruyff's Netherlands lost the 1974 final to West Germany; he stayed home in 1978, and his country lost that final too." },
      { t: "score", q: "The 1974 final, West Germany v the Netherlands, finished:", o: ["West Germany 2-1", "2-0", "1-1", "2-2"], a: 0, e: "The Dutch scored a penalty before a German had even touched the ball, then lost; Breitner and Müller turned it around." },
      { t: "year", q: "The Netherlands lose the World Cup final to hosts Argentina. Lock the year.", a: 1978, e: "Rensenbrink hit the post in the last minute of normal time; Argentina won in extra time, 3-1." },
      { t: "order", q: "Earliest to latest:", items: ["Holland lose the final to West Germany", "Holland lose again to host Argentina", "Holland lose a third final to Spain"], order: [0, 1, 2], e: "1974, 1978, 2010. The best team never to win it, three times over." },
    ],
  },
  "2026-07-16": {
    theme: "The Golden Boot",
    rounds: [
      { t: "five", q: "Who won the Golden Boot at the 2022 World Cup with eight goals?", o: ["Lionel Messi", "Kylian Mbappé", "Julián Álvarez", "Olivier Giroud"], a: 1, e: "Mbappé's eight included a hat-trick in the final, and he still finished on the losing side." },
      { t: "reveal", q: "Name the player.", clues: ["An Italian striker barely known before 1990.", "Came from nowhere to win the Golden Boot at his home World Cup.", "His wide-eyed celebrations defined Italia '90."], o: ["Roberto Baggio", "Salvatore Schillaci", "Gianluca Vialli", "Andrea Carnevale"], a: 1, e: "Schillaci's six goals won the 1990 Golden Boot, though Italy fell in the semi-finals." },
      { t: "score", q: "Italy beat England in the 1990 third-place playoff, Schillaci scoring from the spot:", o: ["Italy 2-1", "1-0 Italy", "2-0 Italy", "1-1"], a: 0, e: "Baggio and Schillaci (penalty) for the hosts; small consolation for the semi-final hurt." },
      { t: "year", q: "Harry Kane wins the World Cup Golden Boot with six goals. Lock the year.", a: 2018, e: "England reached the semis; Kane's six included a hat-trick, two of them penalties, against Panama." },
      { t: "order", q: "Earliest to latest:", items: ["Schillaci's surprise Golden Boot", "Kane wins the Golden Boot", "Mbappé wins the Golden Boot"], order: [0, 1, 2], e: "1990, 2018, 2022. Six or eight goals, and the trophy still isn't guaranteed." },
    ],
  },
  "2026-07-17": {
    theme: "The Trophy",
    rounds: [
      { t: "five", q: "The original World Cup trophy was renamed in 1946 after which FIFA president?", o: ["Jules Rimet", "João Havelange", "Stanley Rous", "Sepp Blatter"], a: 0, e: "The Jules Rimet Trophy was won outright by Brazil in 1970 for a third title, then stolen and never recovered." },
      { t: "reveal", q: "Name the hero.", clues: ["The Jules Rimet trophy was stolen in England in 1966.", "It was found a week later, wrapped in newspaper under a hedge.", "The one who found it was a dog."], o: ["Pickles", "Bobby", "Rex", "Nipper"], a: 0, e: "Pickles the collie sniffed out the stolen trophy in March 1966, months before the tournament, and became a national hero." },
      { t: "score", q: "Brazil won the Jules Rimet trophy outright by taking their third title in 1970, beating Italy:", o: ["Brazil 4-1", "3-1", "Brazil 4-2", "2-1"], a: 0, e: "Three titles meant Brazil kept the trophy for good. It was later stolen from their federation and, most believe, melted down." },
      { t: "year", q: "A brand-new FIFA World Cup Trophy is used for the first time, after Brazil kept the old one. Lock the year.", a: 1974, e: "Designed by Italian Silvio Gazzaniga, it's the one captains have lifted ever since." },
      { t: "order", q: "Earliest to latest:", items: ["Pickles finds the stolen trophy", "Brazil win the Jules Rimet outright", "The current trophy is lifted for the first time"], order: [0, 1, 2], e: "1966, 1970, 1974. Even the trophy has a wild backstory." },
    ],
  },
  "2026-07-18": {
    theme: "The Bronze",
    rounds: [
      { t: "five", q: "Croatia finished third at the 2022 World Cup. Who did they beat in the playoff?", o: ["Morocco", "Belgium", "France", "Argentina"], a: 0, e: "Croatia won 2-1; Morocco's run to fourth was the best ever by an African or Arab nation." },
      { t: "reveal", q: "Name the player.", clues: ["Croatia's midfield metronome and captain.", "Won the 2018 World Cup Golden Ball.", "Led a small nation to a final and, four years on, a third-place finish."], o: ["Ivan Rakitić", "Luka Modrić", "Mateo Kovačić", "Ivan Perišić"], a: 1, e: "Modrić's 2018 Golden Ball came even as Croatia lost the final to France." },
      { t: "score", q: "Croatia's run to the 2018 final ended against France, who won:", o: ["France 4-2", "3-1", "France 3-2", "2-1"], a: 0, e: "Griezmann, Pogba, Mbappé and an own goal; Mandžukić scored at both ends in a six-goal final." },
      { t: "year", q: "Morocco become the first African or Arab nation to reach a World Cup semi-final. Lock the year.", a: 2022, e: "Regragui's side beat Spain and Portugal before losing to France in the last four." },
      { t: "order", q: "Earliest to latest:", items: ["Croatia reach their first World Cup final", "Morocco reach the semi-finals", "Croatia finish third"], order: [0, 1, 2], e: "2018 and 2022: the nearly-men and the history-makers." },
    ],
  },
  "2026-07-19": {
    theme: "The Final",
    rounds: [
      { t: "five", q: "How many World Cup finals have been decided by a penalty shootout?", o: ["Two", "Three", "One", "Four"], a: 1, e: "Three: 1994 (Brazil beat Italy), 2006 (Italy beat France) and 2022 (Argentina beat France)." },
      { t: "reveal", q: "Name the player.", clues: ["French playmaker, son of Algerian immigrants.", "Scored two headers in the 1998 final.", "Ended his career with a red card in the 2006 final."], o: ["Thierry Henry", "Zinedine Zidane", "David Trezeguet", "Patrick Vieira"], a: 1, e: "Zidane's two headers beat Brazil in 1998; eight years later, the headbutt on Materazzi was his last act in football." },
      { t: "score", q: "Zidane's two headers won the 1998 World Cup final for France against Brazil:", o: ["France 3-0", "2-0 France", "3-1 France", "2-1 France"], a: 0, e: "Two Zidane headers from corners and a late Petit goal; Ronaldo, mysteriously off-colour, never got going." },
      { t: "year", q: "Andrés Iniesta scores in extra time to win Spain their first World Cup. Lock the year.", a: 2010, e: "Spain 1-0 the Netherlands in Johannesburg, the first all-European final held outside Europe." },
      { t: "order", q: "Earliest to latest:", items: ["England win the World Cup at Wembley", "Zidane's France win at home", "Messi's Argentina win in Qatar"], order: [0, 1, 2], e: "1966, 1998, 2022. The day that makes everything else worth it." },
    ],
  },
};
