import { BracketMatch } from "../interfaces/BracketMatch";
import { TeamStanding } from "../interfaces/TeamStanding";

export const createBracketData = (
  groupAStandings: TeamStanding[],
  groupBStandings: TeamStanding[]
): { playInMatch: BracketMatch; mainBracket: BracketMatch[] } => {
  // Combine both group standings
  const combinedStandings = [...groupAStandings, ...groupBStandings].sort(
    (a, b) => b.winPercentage - a.winPercentage
  );

  // Top 7 teams and the play-in teams (8th and 9th)
  const topTeams = combinedStandings.slice(0, 7);
  const playInTeams = combinedStandings.slice(7, 9);

  const playInMatch: BracketMatch = {
    id: "playIn",
    name: "Play-In Game",
    scheduled: Date.now(),
    sides: {
      home: {
        team: {
          id: "8",
          name: playInTeams[0]?.team || "8th Seed",
        },
        score: {
          score: 0,
        },
      },
      visitor: {
        team: {
          id: "9",
          name: playInTeams[1]?.team || "9th Seed",
        },
        score: {
          score: 0,
        },
      },
    },
    children: [],
  };

  const quarterFinals: BracketMatch[] = [
    {
      id: "qf1",
      name: "Quarterfinal 1",
      scheduled: Date.now(),
      sides: {
        home: {
          team: {
            id: "1",
            name: topTeams[0]?.team || "1st Seed",
          },
          score: {
            score: 0,
          },
        },
        visitor: {
          team: {
            id: "playInWinner",
            name: "Winner of Play-In",
          },
          score: {
            score: 0,
          },
        },
      },
      children: [],
    },
    {
      id: "qf2",
      name: "Quarterfinal 2",
      scheduled: Date.now(),
      sides: {
        home: {
          team: {
            id: "4",
            name: topTeams[3]?.team || "4th Seed",
          },
          score: {
            score: 0,
          },
        },
        visitor: {
          team: {
            id: "5",
            name: topTeams[4]?.team || "5th Seed",
          },
          score: {
            score: 0,
          },
        },
      },
      children: [],
    },
    {
      id: "qf3",
      name: "Quarterfinal 3",
      scheduled: Date.now(),
      sides: {
        home: {
          team: {
            id: "2",
            name: topTeams[1]?.team || "2nd Seed",
          },
          score: {
            score: 0,
          },
        },
        visitor: {
          team: {
            id: "7",
            name: topTeams[6]?.team || "7th Seed",
          },
          score: {
            score: 0,
          },
        },
      },
      children: [],
    },
    {
      id: "qf4",
      name: "Quarterfinal 4",
      scheduled: Date.now(),
      sides: {
        home: {
          team: {
            id: "3",
            name: topTeams[2]?.team || "3rd Seed",
          },
          score: {
            score: 0,
          },
        },
        visitor: {
          team: {
            id: "6",
            name: topTeams[5]?.team || "6th Seed",
          },
          score: {
            score: 0,
          },
        },
      },
      children: [],
    },
  ];

  const semiFinals: BracketMatch[] = [
    {
      id: "sf1",
      name: "Semifinal 1",
      scheduled: Date.now(),
      sides: {
        home: {
          team: {
            id: "winnerQF1",
            name: "Winner of QF1",
          },
          score: {
            score: 0,
          },
        },
        visitor: {
          team: {
            id: "winnerQF2",
            name: "Winner of QF2",
          },
          score: {
            score: 0,
          },
        },
      },
      children: [],
    },
    {
      id: "sf2",
      name: "Semifinal 2",
      scheduled: Date.now(),
      sides: {
        home: {
          team: {
            id: "winnerQF3",
            name: "Winner of QF3",
          },
          score: {
            score: 0,
          },
        },
        visitor: {
          team: {
            id: "winnerQF4",
            name: "Winner of QF4",
          },
          score: {
            score: 0,
          },
        },
      },
      children: [],
    },
  ];

  const finalMatch: BracketMatch = {
    id: "final",
    name: "Final",
    scheduled: Date.now(),
    sides: {
      home: {
        team: {
          id: "winnerSF1",
          name: "Winner of SF1",
        },
        score: {
          score: 0,
        },
      },
      visitor: {
        team: {
          id: "winnerSF2",
          name: "Winner of SF2",
        },
        score: {
          score: 0,
        },
      },
    },
    children: [],
  };

  // Link the matches together
  semiFinals[0].children.push(finalMatch);
  semiFinals[1].children.push(finalMatch);

  quarterFinals[0].children.push(semiFinals[0]);
  quarterFinals[1].children.push(semiFinals[0]);
  quarterFinals[2].children.push(semiFinals[1]);
  quarterFinals[3].children.push(semiFinals[1]);

  // Play-In winner links to the first quarterfinal
  playInMatch.children.push(quarterFinals[0]);

  return {
    playInMatch,
    mainBracket: quarterFinals,
  };
};
