import { Match } from "../interfaces/Match";
import { TeamStanding } from "../interfaces/TeamStanding";

// Assuming you have an array of all team names:
const allTeams = [
  "Mexico",
  "Germany",
  "Italy",
  "Greece",
  "Ireland",
  "USA",
  "Canada",
  "France",
  "Australia",
];

// Initialize standings for all teams:
function initializeStandings(teams: string[]): Record<string, TeamStanding> {
  const standingsMap: Record<string, TeamStanding> = {};
  teams.forEach((team) => {
    standingsMap[team] = {
      team,
      played: 0,
      won: 0,
      lost: 0,
      winPercentage: 0,
    };
  });
  return standingsMap;
}

export function calculateStandings(
  teams: string[],
  matches: Match[]
): TeamStanding[] {
  let standingsMap = initializeStandings(teams);

  matches.forEach((match) => {
    const { team1, team2, scoreTeam1, scoreTeam2, status } = match;

    if (
      status !== "completed" ||
      scoreTeam1 === undefined ||
      scoreTeam2 === undefined
    ) {
      return; // Skip non-completed matches or matches with undefined scores
    }

    standingsMap[team1].played++;
    standingsMap[team2].played++;

    if (scoreTeam1 > scoreTeam2) {
      standingsMap[team1].won++;
      standingsMap[team2].lost++;
    } else {
      standingsMap[team2].won++;
      standingsMap[team1].lost++;
    }

    // Update win percentages
    standingsMap[team1].winPercentage =
      (standingsMap[team1].won / standingsMap[team1].played) * 100;
    standingsMap[team2].winPercentage =
      (standingsMap[team2].won / standingsMap[team2].played) * 100;
  });

  return Object.values(standingsMap).sort(
    (a, b) => b.winPercentage - a.winPercentage || b.won - a.won
  );
}
