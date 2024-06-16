import { Match } from "../interfaces/Match";
import { TeamStanding } from "../interfaces/TeamStanding";

const calculateStandings = (
  teams: string[],
  matches: Match[]
): TeamStanding[] => {
  const standingsMap: { [team: string]: TeamStanding } = {};
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
  });

  matches.forEach((match) => {
    const { team1, team2, scoreTeam1, scoreTeam2 } = match;
    if (scoreTeam1 !== undefined && scoreTeam2 !== undefined) {
      if (scoreTeam1 > scoreTeam2) {
        standingsMap[team1].won++;
        standingsMap[team2].lost++;
        standingsMap[team1].played++;
        standingsMap[team2].played++;
      } else {
        standingsMap[team2].won++;
        standingsMap[team1].lost++;
        standingsMap[team1].played++;
        standingsMap[team2].played++;
      }
    }
  });

  Object.keys(standingsMap).forEach((team) => {
    const { won, lost } = standingsMap[team];
    standingsMap[team].winPercentage = won / (won + lost);
  });

  const sortedStandings = Object.values(standingsMap).sort(
    (a, b) => b.winPercentage - a.winPercentage
  );

  // Assign position based on the index in the sorted array
  sortedStandings.forEach((team, index) => {
    team.position = index + 1;
  });

  return sortedStandings;
};

export { calculateStandings };
