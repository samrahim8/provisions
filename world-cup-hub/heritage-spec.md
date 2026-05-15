# The Heritage · Product Spec

provisions.soccer good #06. The football identity engine: find the nations you can root for, walk out with a team and a crest.

## The unlock

Most US fans don't have one clean country to root for. They're a mix. They half-cheer for Italy because of a great-grandfather, kinda root for Mexico because their best friend does, default to USA because it's home. The Heritage solves that.

You answer some questions about your background, your vibes, or both. You walk out with a primary team to back for the 2026 World Cup plus two backups. You also walk out with a crest — your own, stamped with your name, your team's colors, and a personal motto. That crest is the share unit.

## The constraint that makes it witty

We use **FIFA's actual player eligibility rule**: one grandparent from a country makes you eligible to play for them. We apply the same rule to fans. If a player can wear that nation's shirt, you can root for it. That gives the product a defensible, real-world frame that nobody can argue with. "I'm three-quarters eligible for Croatia by FIFA rules" is more interesting than "I'm 28% Croatian per DNA test."

## The flow

```
                 ┌───────────────┐
                 │ Pick your way │
                 └───────┬───────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
  ┌───────────┐   ┌────────────┐   ┌────────────┐
  │ The Tree  │   │  The Vibes │   │  The Slip  │
  │ (lineage) │   │   (quiz)   │   │  (DNA upl) │
  └─────┬─────┘   └─────┬──────┘   └─────┬──────┘
        │               │                │
        └───────────────┼────────────────┘
                        ▼
              ┌──────────────────┐
              │  Your Eligibility│
              │  primary + 2     │
              │  backups         │
              └─────────┬────────┘
                        │
                        ▼
              ┌──────────────────┐
              │   The Crest      │
              │   stamped, named │
              │   shareable PNG  │
              └──────────────────┘
```

## The three entry points

### A. The Tree (Family Tree)

A bordered family-tree form. Three generations: parents, grandparents, great-grandparents (optional). Each slot gets a country dropdown (48 WC '26 teams + "Other" + "Unknown").

Logic:
- 1 parent or grandparent from a country = eligible (FIFA rule)
- Multiple grandparents from same country = "stronger claim"
- If user has eligibility for 3+ countries, primary defaults to the strongest claim with a swap option

UX: minimal, clean, no signup. Centered card, dropdowns stamped in Provisions style. Mobile-friendly (this will be filled on phones).

### B. The Vibes (Quiz)

7 questions. Each maps to a *football identity vector*. Output: % match to each of the 48 nations, top 3 shown.

Question design — every question maps to a real footballing dimension, not random BuzzFeed nonsense:

1. **"Your team is down 1-0 at halftime. Your move?"**
   *(Tactical identity: defensive lockdown / counter-attack / dominate possession / all-out attack)*
   Maps to: catenaccio nations (Italy, Uruguay), counter-attack (Mexico, Morocco), possession (Spain, Argentina), gegen-press (Germany, Netherlands).

2. **"Pick a sound."**
   *(Audio identity)*
   Options: brass band / accordion / oud / taiko drum / mariachi trumpet / bagpipe / hardstyle drop / bandoneón.
   Direct to the anthem archetypes.

3. **"Drama or steel?"**
   *(Emotional register)*
   Drama = Argentina, Italy, Portugal. Steel = Germany, Switzerland, Japan.

4. **"Pick your kit."**
   *(Visual identity)*
   Shows 8 kit color combinations stripped of context. Pick one. Each maps to a cluster.

5. **"What's your meal?"**
   *(Cultural identity)*
   Tacos / pasta / pho / jollof / paella / sushi / curry / asado.

6. **"Underdog or favorite?"**
   *(Narrative preference)*
   Underdog leans Morocco, Senegal, Croatia. Favorite leans Brazil, France, Argentina.

7. **"Pick a number."**
   *(Iconic player association)*
   10 (Maradona, Messi, Pelé) / 7 (Ronaldo, Beckham) / 9 (Ronaldo Nazário, Drogba) / 1 (Yashin, Casillas, Kahn) / 4 (Beckenbauer, Sergio Ramos).

Scoring: each answer adds weighted points to 1-3 countries. Top score becomes primary, 2 and 3 become backups.

### C. The Slip (DNA Upload) — Phase 2, ship later

Upload your 23andMe or AncestryDNA ethnicity export (CSV/JSON). Parsed client-side only (never sent to a server). Ethnicity percentages mapped to country clusters.

**Why defer:** the mapping is messy ("Southern European 14%" can't cleanly become a single country), and DNA tests are reductive of how heritage actually works. The Tree and the Vibes ship first because they're cleaner. DNA can be a Phase 2 add.

## The output

### Your Eligibility card

A bordered Provisions card. Centered layout. Three slots:

```
┌────────────────────────────────────┐
│                                    │
│     YOUR PRIMARY                   │
│     [BIG FLAG] CROATIA             │
│     Vatreni                        │
│                                    │
│     YOUR BACKUPS                   │
│     [flag] Argentina               │
│     [flag] Morocco                 │
│                                    │
│     [ Make my crest →  ]           │
│                                    │
└────────────────────────────────────┘
```

User can swap primary for one of the backups before generating the crest.

### The Crest

The share unit. Procedurally generated SVG, 1080×1920 vertical for IG story export, plus a 1080×1080 square version.

Crest contains:
- Shield shape in primary team's colors
- 1 to 5 stars across the top (Provisions uses these for "eligibility strength" — 5 stars if user has 3+ grandparents from this country, fewer for partial claims)
- User's first name in the banner
- A short user-written motto on a scroll (defaults to a generated one if user skips)
- Primary team's iconic emblem element (e.g., Croatia's šahovnica checker pattern, Brazil's CBF green-yellow diamond, Mexico's eagle silhouette)
- Provisions edge stamp + "FIFA-eligible since [year of grandparent's birth]" footer if Tree was used

Style: like the Kit Index `legoKit()` SVG patterns. Procedural, data-driven, modern interpretation of heraldry.

### The declaration

After the crest renders, one optional final step: **The Declaration**.

> I, [Name], hereby pledge my allegiance to [Croatia] for the 2026 World Cup. Backups: [Argentina, Morocco]. By the laws of FIFA and the streets of [user's city], I'm in.

Provisions-stamped PDF / image. Sign-able with stylus or finger on mobile. Mock-official, very on-brand for a small studio.

This is the second share unit. Some people will skip it. Heavy users will print it.

## Shareability mechanics

Every output is a vertical PNG by default, optimized for IG story sound-off (no audio needed). Each share carries:

- The flag + team name (the identity claim)
- The user's first name (personal)
- The crest design (the visual hook)
- "provisions.soccer/heritage" attribution (the share-back loop)
- A short caption auto-generated for tap-to-copy: "Just got my World Cup team. I'm rooting for Croatia. What about you? provisions.soccer/heritage"

Group-chat moment: friends ping each other their crests. Friends compare primaries. Friends argue. This is the goal.

## Tech architecture

Stack: same as the rest of provisions.soccer (static HTML, no backend).

- All logic client-side, no signup, no database
- Form state lives in browser only
- Crest renders as inline SVG, exported to PNG via html2canvas or canvas-to-blob
- 48-country data file shared with the rest of provisions.soccer (re-use the WC_TEAMS array already in index.html, plus a new `heritage-data.json` with the FIFA-style player-eligibility metadata and quiz scoring weights)
- No DNA, no PII, no server. The whole product runs from one `/heritage` page.

## Routes

- `/heritage` — the entry, pick your method
- `/heritage/tree` — family tree form
- `/heritage/vibes` — quiz
- `/heritage/result` — eligibility card + crest generator (state-driven, URL-encoded so it's shareable)
- `/heritage/result?p=cro&b1=arg&b2=mar&n=sam&m=...` — a sharable permalink renders someone else's result

## Phased build

### Phase 1 — The Tree + Result + Crest (3 to 4 days)
- `/heritage` entry page with two buttons (Tree, Vibes)
- `/heritage/tree` form with 3-gen dropdowns
- Eligibility calculator (FIFA grandparent rule)
- Result card with primary + 2 backups, swap UI
- Procedural crest SVG generator
- PNG export
- Share-back attribution

### Phase 2 — The Vibes (2 days)
- `/heritage/vibes` quiz UI
- Question + answer scoring data
- Same result page as Tree (shared component)

### Phase 3 — The Declaration (1 to 2 days)
- Sign-on-screen UI
- PDF export option

### Phase 4 — The Slip (DNA upload) (2 to 3 days)
- 23andMe + Ancestry export parser
- Ethnicity-to-country cluster mapping
- Privacy disclaimer ("we never upload this anywhere")
- Same result page

### Phase 5 — Polish
- Per-team result pages with deep links to that nation's country page (when those exist)
- Leaderboard of "most-claimed countries" on Provisions (passive scoreboard)
- Print-quality PDF crest for users who want to actually frame it

## Open questions

1. **Crest naming on user-side.** Do we let users name their crest ("House of Sam") or stick to first name only? House names feel game-y, first names feel real. Default: first name only.
2. **Eligibility floor.** Does 1 great-grandparent count or do we cut at grandparent? FIFA cuts at grandparent. I say we follow that.
3. **What if all four grandparents are from non-WC nations?** (Plenty of US fans with Irish, Polish, Lebanese, etc. ancestry whose nations didn't qualify.) Output: "Your bloodline didn't make the tournament — here's who to root for based on football vibes." Forward them to the Vibes quiz.
4. **Naming.** "The Heritage" is on the site already. Alternatives if you want: "The Eligibility," "The Allegiance," "The Calling." Heritage works.
5. **What if no answer feels right after both Tree and Vibes?** Add an "I just want to pick" escape hatch — country grid, click one, done. Don't trap users in a quiz.

## Why this is the right second-cycle good

- Most personally meaningful of the six (it gives you a *thing* you didn't have before)
- Strongest identity-share unit (crest with your name on it)
- Highest pre-tournament timing (people pick their team in May/June, not after kickoff)
- Reuses existing assets (WC_TEAMS array, kit-color system, procedural SVG muscle from Kit Index)
- Solves a real user problem (the "who do I root for" question) — every other good is consumed, this one is *resolved*
