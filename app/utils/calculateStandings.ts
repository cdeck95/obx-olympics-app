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
    if (match.status !== "completed") return;
    if (
      scoreTeam1 !== undefined &&
      scoreTeam1 !== null &&
      scoreTeam2 != null &&
      scoreTeam2 !== undefined
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

  // Sort standings with tie breakers: head-to-head wins first, then win percentage
  const sortedStandings = Object.values(standingsMap).sort((a, b) => {
    if (b.headToHeadWins !== a.headToHeadWins) {
      return b.headToHeadWins - a.headToHeadWins;
    }
    return b.winPercentage - a.winPercentage;
  });

  // Assign positions based on the sorted standings
  sortedStandings.forEach((team, index) => {
    team.position = index + 1;
  });

  return sortedStandings;
};

export { calculateStandings };
