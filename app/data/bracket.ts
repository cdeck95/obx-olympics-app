import { Game } from "react-tournament-bracket/lib/components/model";
import { TeamStanding } from "../interfaces/TeamStanding";

export const createBracketData = (
  groupAStandings: TeamStanding[],
  groupBStandings: TeamStanding[]
): { playInMatch: Game; mainBracket: Game[] } => {
  const combinedStandings = [...groupAStandings, ...groupBStandings].sort(
    (a, b) => b.winPercentage - a.winPercentage
  );

  const topTeams = combinedStandings.slice(0, 7);
  const playInTeams = combinedStandings.slice(7, 9);

  const playInMatch: Game = {
    id: "playIn",
    name: "Play-In Game",
    scheduled: Date.now(),
    sides: {
      home: {
        team: { id: "8", name: playInTeams[0]?.team || "8th Seed" },
        score: { score: 0 },
        seed: {
          displayName: "8th Seed",
          rank: 8,
          sourceGame: undefined as any,
          sourcePool: {},
        },
      },
      visitor: {
        team: { id: "9", name: playInTeams[1]?.team || "9th Seed" },
        score: { score: 0 },
        seed: {
          displayName: "9th Seed",
          rank: 9,
          sourceGame: undefined as any,
          sourcePool: {},
        },
      },
    },
  };

  const quarterFinals: Game[] = [
    {
      id: "qf1",
      name: "Quarterfinal 1",
      scheduled: Date.now(),
      sides: {
        home: {
          team: { id: "1", name: topTeams[0]?.team || "1st Seed" },
          score: { score: 0 },
          seed: {
            displayName: "1st Seed",
            rank: 1,
            sourceGame: undefined as any,
            sourcePool: {},
          },
        },
        visitor: {
          team: { id: "playInWinner", name: "Winner of Play-In" },
          score: { score: 0 },
          seed: {
            displayName: "8th Seed",
            rank: 8,
            sourceGame: playInMatch,
            sourcePool: {},
          },
        },
      },
    },
    {
      id: "qf2",
      name: "Quarterfinal 2",
      scheduled: Date.now(),
      sides: {
        home: {
          team: { id: "4", name: topTeams[3]?.team || "4th Seed" },
          score: { score: 0 },
          seed: {
            displayName: "4th Seed",
            rank: 4,
            sourceGame: undefined as any,
            sourcePool: {},
          },
        },
        visitor: {
          team: { id: "5", name: topTeams[4]?.team || "5th Seed" },
          score: { score: 0 },
          seed: {
            displayName: "5th Seed",
            rank: 5,
            sourceGame: undefined as any,
            sourcePool: {},
          },
        },
      },
    },
    {
      id: "qf3",
      name: "Quarterfinal 3",
      scheduled: Date.now(),
      sides: {
        home: {
          team: { id: "2", name: topTeams[1]?.team || "2nd Seed" },
          score: { score: 0 },
          seed: {
            displayName: "2nd Seed",
            rank: 2,
            sourceGame: undefined as any,
            sourcePool: {},
          },
        },
        visitor: {
          team: { id: "7", name: topTeams[6]?.team || "7th Seed" },
          score: { score: 0 },
          seed: {
            displayName: "7th Seed",
            rank: 7,
            sourceGame: undefined as any,
            sourcePool: {},
          },
        },
      },
    },
    {
      id: "qf4",
      name: "Quarterfinal 4",
      scheduled: Date.now(),
      sides: {
        home: {
          team: { id: "3", name: topTeams[2]?.team || "3rd Seed" },
          score: { score: 0 },
          seed: {
            displayName: "3rd Seed",
            rank: 3,
            sourceGame: undefined as any,
            sourcePool: {},
          },
        },
        visitor: {
          team: { id: "6", name: topTeams[5]?.team || "6th Seed" },
          score: { score: 0 },
          seed: {
            displayName: "6th Seed",
            rank: 6,
            sourceGame: undefined as any,
            sourcePool: {},
          },
        },
      },
    },
  ];

  const semiFinals: Game[] = [
    {
      id: "sf1",
      name: "Semifinal 1",
      scheduled: Date.now(),
      sides: {
        home: {
          team: { id: "winnerQF1", name: "Winner of QF1" },
          score: { score: 0 },
          seed: {
            displayName: "Winner QF1",
            rank: 1,
            sourceGame: quarterFinals[0],
            sourcePool: {},
          },
        },
        visitor: {
          team: { id: "winnerQF2", name: "Winner of QF2" },
          score: { score: 0 },
          seed: {
            displayName: "Winner QF2",
            rank: 2,
            sourceGame: quarterFinals[1],
            sourcePool: {},
          },
        },
      },
    },
    {
      id: "sf2",
      name: "Semifinal 2",
      scheduled: Date.now(),
      sides: {
        home: {
          team: { id: "winnerQF3", name: "Winner of QF3" },
          score: { score: 0 },
          seed: {
            displayName: "Winner QF3",
            rank: 3,
            sourceGame: quarterFinals[2],
            sourcePool: {},
          },
        },
        visitor: {
          team: { id: "winnerQF4", name: "Winner of QF4" },
          score: { score: 0 },
          seed: {
            displayName: "Winner QF4",
            rank: 4,
            sourceGame: quarterFinals[3],
            sourcePool: {},
          },
        },
      },
    },
  ];

  const finalMatch: Game = {
    id: "final",
    name: "Final",
    scheduled: Date.now(),
    sides: {
      home: {
        team: { id: "winnerSF1", name: "Winner of SF1" },
        score: { score: 0 },
        seed: {
          displayName: "Winner SF1",
          rank: 1,
          sourceGame: semiFinals[0],
          sourcePool: {},
        },
      },
      visitor: {
        team: { id: "winnerSF2", name: "Winner of SF2" },
        score: { score: 0 },
        seed: {
          displayName: "Winner SF2",
          rank: 2,
          sourceGame: semiFinals[1],
          sourcePool: {},
        },
      },
    },
  };

  return {
    playInMatch,
    mainBracket: [playInMatch, ...quarterFinals, ...semiFinals, finalMatch],
  };
};
