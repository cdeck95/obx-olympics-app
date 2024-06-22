import { Game } from "@g-loot/react-tournament-brackets";

interface TeamStanding {
  team: string;
  won: number;
  lost: number;
  winPercentage: number;
  headToHeadWins: number;
}

interface BracketMatch extends Game {
  children?: BracketMatch[];
}

export const createBracketData = (standings: TeamStanding[]) => {
  const combinedStandings = [...standings].sort(
    (a, b) => b.winPercentage - a.winPercentage
  );

  console.log("Combined standings:", combinedStandings);

  const playInMatch: BracketMatch = {
    id: "playin",
    name: "Play-in Match",
    nextMatchId: "quarter1",
    tournamentRoundText: "Play-in",
    startTime: "Flip Cup", // Play-in game station
    state: "Upcoming",
    participants: [
      {
        id: combinedStandings[7].team,
        name: combinedStandings[7].team,
        isWinner: false,
        status: null,
        resultText: "",
      },
      {
        id: combinedStandings[8].team,
        name: combinedStandings[8].team,
        isWinner: false,
        status: null,
        resultText: "",
      },
    ],
  };

  const quarterFinals: BracketMatch[] = [
    {
      id: "quarter1",
      name: "Quarterfinal 1",
      nextMatchId: "semi1",
      tournamentRoundText: "Quarterfinals",
      startTime: "Cornhole",
      state: "Upcoming",
      participants: [
        {
          id: combinedStandings[0].team,
          name: combinedStandings[0].team,
          isWinner: false,
          status: null,
          resultText: "",
        },
        {
          id: "winner_playin",
          name: "Winner of Play-in",
          isWinner: false,
          status: null,
          resultText: "",
        },
      ],
    },
    {
      id: "quarter2",
      name: "Quarterfinal 2",
      nextMatchId: "semi1",
      tournamentRoundText: "Quarterfinals",
      startTime: "Cornhole",
      state: "Upcoming",
      participants: [
        {
          id: combinedStandings[1].team,
          name: combinedStandings[1].team,
          isWinner: false,
          status: null,
          resultText: "",
        },
        {
          id: combinedStandings[6].team,
          name: combinedStandings[6].team,
          isWinner: false,
          status: null,
          resultText: "",
        },
      ],
    },
    {
      id: "quarter3",
      name: "Quarterfinal 3",
      nextMatchId: "semi2",
      tournamentRoundText: "Quarterfinals",
      startTime: "Cornhole",
      state: "Upcoming",
      participants: [
        {
          id: combinedStandings[2].team,
          name: combinedStandings[2].team,
          isWinner: false,
          status: null,
          resultText: "",
        },
        {
          id: combinedStandings[5].team,
          name: combinedStandings[5].team,
          isWinner: false,
          status: null,
          resultText: "",
        },
      ],
    },
    {
      id: "quarter4",
      name: "Quarterfinal 4",
      nextMatchId: "semi2",
      tournamentRoundText: "Quarterfinals",
      startTime: "Cornhole",
      state: "Upcoming",
      participants: [
        {
          id: combinedStandings[3].team,
          name: combinedStandings[3].team,
          isWinner: false,
          status: null,
          resultText: "",
        },
        {
          id: combinedStandings[4].team,
          name: combinedStandings[4].team,
          isWinner: false,
          status: null,
          resultText: "",
        },
      ],
    },
  ];

  const semiFinals: BracketMatch[] = [
    {
      id: "semi1",
      name: "Semifinal 1",
      nextMatchId: "final",
      tournamentRoundText: "Semifinals",
      startTime: "Can Jam",
      state: "Upcoming",
      participants: [
        {
          id: "winner_quarter1",
          name: "Winner of Quarterfinal 1",
          isWinner: false,
          status: null,
          resultText: "",
        },
        {
          id: "winner_quarter2",
          name: "Winner of Quarterfinal 2",
          isWinner: false,
          status: null,
          resultText: "",
        },
      ],
    },
    {
      id: "semi2",
      name: "Semifinal 2",
      nextMatchId: "final",
      tournamentRoundText: "Semifinals",
      startTime: "Can Jam",
      state: "Upcoming",
      participants: [
        {
          id: "winner_quarter3",
          name: "Winner of Quarterfinal 3",
          isWinner: false,
          status: null,
          resultText: "",
        },
        {
          id: "winner_quarter4",
          name: "Winner of Quarterfinal 4",
          isWinner: false,
          status: null,
          resultText: "",
        },
      ],
    },
  ];

  const finalMatch: BracketMatch = {
    id: "final",
    name: "Final",
    nextMatchId: null,
    tournamentRoundText: "Final",
    startTime: "Gauntlet",
    state: "Upcoming",
    participants: [
      {
        id: "winner_semi1",
        name: "Winner of Semifinal 1",
        isWinner: false,
        status: null,
        resultText: "",
      },
      {
        id: "winner_semi2",
        name: "Winner of Semifinal 2",
        isWinner: false,
        status: null,
        resultText: "",
      },
    ],
  };

  // Link the matches together
  quarterFinals[0].participants[1].id = playInMatch.id;
  semiFinals[0].participants[0].id = quarterFinals[0].id;
  semiFinals[0].participants[1].id = quarterFinals[1].id;
  semiFinals[1].participants[0].id = quarterFinals[2].id;
  semiFinals[1].participants[1].id = quarterFinals[3].id;
  finalMatch.participants[0].id = semiFinals[0].id;
  finalMatch.participants[1].id = semiFinals[1].id;

  // Combine all matches into the main bracket
  const mainBracket: Game[] = [
    playInMatch,
    ...quarterFinals,
    ...semiFinals,
    finalMatch,
  ];

  return mainBracket;
};
