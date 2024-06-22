import { Match } from "../interfaces/Match";
import { TeamStanding } from "../interfaces/TeamStanding";

const calculateStandings = (
  teams: string[],
  matches: Match[]
): TeamStanding[] => {
  const standingsMap: { [team: string]: TeamStanding } = {};
  const headToHeadMap: { [team: string]: { [opponent: string]: number } } = {};

  // Initialize standings and head-to-head maps
  teams.forEach((team) => {
    standingsMap[team] = {
      position: 0,
      team,
      won: 0,
      lost: 0,
      played: 0,
      winPercentage: 0,
      headToHeadWins: 0,
    };
    headToHeadMap[team] = {};
    teams.forEach((opponent) => {
      if (team !== opponent) {
        headToHeadMap[team][opponent] = 0;
      }
    });
  });

  // Calculate wins, losses, and head-to-head results
  matches.forEach((match) => {
    const { team1, team2, scoreTeam1, scoreTeam2 } = match;
    if (match.status !== "Completed") return;
    if (
      scoreTeam1 !== undefined &&
      scoreTeam1 !== null &&
      scoreTeam2 !== undefined &&
      scoreTeam2 !== null
    ) {
      if (scoreTeam1 > scoreTeam2) {
        standingsMap[team1].won++;
        standingsMap[team2].lost++;
        headToHeadMap[team1][team2]++;
      } else {
        standingsMap[team2].won++;
        standingsMap[team1].lost++;
        headToHeadMap[team2][team1]++;
      }
      standingsMap[team1].played++;
      standingsMap[team2].played++;
    }
  });

  // Calculate win percentage
  Object.keys(standingsMap).forEach((team) => {
    const { won, lost } = standingsMap[team];
    standingsMap[team].winPercentage = won / (won + lost);
  });

  // Sort standings with tie breakers: number of wins first, then head-to-head wins, then win percentage
  const sortedStandings = Object.values(standingsMap).sort((a, b) => {
    // Compare number of wins first
    if (b.won !== a.won) {
      return b.won - a.won;
    }

    // Compare head-to-head wins next
    if (b.headToHeadWins !== a.headToHeadWins) {
      return b.headToHeadWins - a.headToHeadWins;
    }

    // Handle win percentage with NaN values considered higher than 0%
    const winPercentageA = isNaN(a.winPercentage)
      ? Number.MAX_VALUE
      : a.winPercentage;
    const winPercentageB = isNaN(b.winPercentage)
      ? Number.MAX_VALUE
      : b.winPercentage;
    return winPercentageB - winPercentageA;
  });

  // Assign positions based on the sorted standings
  sortedStandings.forEach((team, index) => {
    team.position = index + 1;
  });

  return sortedStandings;
};

export { calculateStandings };
