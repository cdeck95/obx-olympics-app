import { Match, Game } from "@g-loot/react-tournament-brackets";
import { Round } from "../interfaces/Round";
import { TeamStanding } from "../interfaces/TeamStanding";
import { calculateStandings } from "./calculateStandings";

const simulateGroupPlay = (
  scheduleA: Round[],
  scheduleB: Round[],
  teamsA: string[],
  teamsB: string[]
): { standingsA: TeamStanding[]; standingsB: TeamStanding[] } => {
  const updatedScheduleA = scheduleA.map((round) => ({
    ...round,
    matches: round.matches.map((match) => ({
      ...match,
      scoreTeam1: Math.floor(Math.random() * 10),
      scoreTeam2: Math.floor(Math.random() * 10),
    })),
  }));

  const updatedScheduleB = scheduleB.map((round) => ({
    ...round,
    matches: round.matches.map((match) => ({
      ...match,
      scoreTeam1: Math.floor(Math.random() * 10),
      scoreTeam2: Math.floor(Math.random() * 10),
    })),
  }));

  const standingsA = calculateStandings(
    teamsA,
    updatedScheduleA.flatMap((round) => round.matches)
  );
  const standingsB = calculateStandings(
    teamsB,
    updatedScheduleB.flatMap((round) => round.matches)
  );

  return { standingsA, standingsB };
};

export { simulateGroupPlay };
