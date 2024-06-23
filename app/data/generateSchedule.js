const fs = require("fs");
const path = require("path");
const checkSchedule = require("./checkSchedule");

// Load teams and stations from JSON files
const teamsLoad = JSON.parse(
  fs.readFileSync(path.join(__dirname, "teams.json"), "utf8")
);
const teams = teamsLoad.teams;

const stations = JSON.parse(
  fs.readFileSync(path.join(__dirname, "stations.json"), "utf8")
);

// Ensure each team plays 4 or 5 games
const minGamesPerTeam = 4;
const maxGamesPerTeam = 5;
const roundsPerTeam = 5;
const matchesPerRound = 4;
const maxRetries = 100;

// Helper function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const createMatchupKey = (team1, team2) => `${team1}-${team2}`;

const generateSchedule = (teams, stations) => {
  let schedule;
  let retries = 0;
  let matchId = 1;

  while (retries < maxRetries) {
    const rounds = [];
    const teamStationMap = {};
    const teamGamesCount = {};
    const matchups = new Set();

    teams.forEach((team) => {
      teamStationMap[team.name] = new Set();
      teamGamesCount[team.name] = 0;
    });

    let roundNumber = 1;
    let validSchedule = true;

    while (true) {
      const matches = [];
      shuffleArray(teams);

      for (let i = 0; i < teams.length; i += 2) {
        const team1 = teams[i];
        const team2 = teams[i + 1];

        if (team2 === undefined) {
          matches.push({
            id: matchId++,
            team1: team1.name,
            team2: "BYE",
            station: null,
            scoreTeam1: null,
            scoreTeam2: null,
            status: "Upcoming",
            roundNumber: roundNumber,
            isWinnerTeam1: null,
            isWinnerTeam2: null,
          });
          continue;
        }

        const availableStations = stations.filter(
          (station) =>
            !teamStationMap[team1.name].has(station.id) &&
            !teamStationMap[team2.name].has(station.id)
        );

        if (
          availableStations.length === 0 ||
          teamGamesCount[team1.name] >= maxGamesPerTeam ||
          teamGamesCount[team2.name] >= maxGamesPerTeam ||
          matchups.has(createMatchupKey(team1.name, team2.name))
        ) {
          validSchedule = false;
          break;
        }

        shuffleArray(availableStations);
        const selectedStation = availableStations[0];

        matches.push({
          id: matchId++,
          team1: team1.name,
          team2: team2.name,
          station: selectedStation,
          scoreTeam1: null,
          scoreTeam2: null,
          status: "Upcoming",
          roundNumber: roundNumber,
          isWinnerTeam1: null,
          isWinnerTeam2: null,
        });

        teamStationMap[team1.name].add(selectedStation.id);
        teamStationMap[team2.name].add(selectedStation.id);
        teamGamesCount[team1.name]++;
        teamGamesCount[team2.name]++;
        matchups.add(createMatchupKey(team1.name, team2.name));
        matchups.add(createMatchupKey(team2.name, team1.name));
      }

      if (!validSchedule) break;

      if (matches.length > 0) {
        rounds.push(...matches);
        roundNumber++;
      }

      if (teams.every((team) => teamGamesCount[team.name] >= minGamesPerTeam)) {
        break;
      }
    }

    if (validSchedule) {
      schedule = rounds;
      const checkResult = checkSchedule({ schedule });
      if (checkResult.valid) {
        return { schedule, valid: true };
      }
    }

    retries++;
    matchId = 1; // Reset match ID for the next attempt
  }

  return { schedule: null, valid: false };
};

const { schedule, valid } = generateSchedule(teams, stations.stations);

if (valid) {
  const scheduleData = {
    schedule: schedule,
    groupStageActive: false,
    groupStageOver: false,
  };

  fs.writeFileSync(
    path.join(__dirname, "schedules.json"),
    JSON.stringify(scheduleData, null, 2),
    "utf8"
  );

  console.log("Schedule generated and saved to schedules.json");
} else {
  console.error("Failed to generate a valid schedule after max retries.");
}
