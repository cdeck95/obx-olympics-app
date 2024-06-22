const fs = require("fs");
const path = require("path");

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

// Helper function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const createMatchupKey = (team1, team2) => `${team1}-${team2}`;

// Generate the schedule
const generateSchedule = (teams, stations) => {
  const rounds = [];
  const teamStationMap = {};
  const teamGamesCount = {};
  const matchups = new Set();

  // Initialize teamStationMap and teamGamesCount
  teams.forEach((team) => {
    teamStationMap[team.name] = new Set();
    teamGamesCount[team.name] = 0;
  });

  let roundNumber = 1;
  while (true) {
    const matches = [];
    shuffleArray(teams);

    for (let i = 0; i < teams.length; i += 2) {
      const team1 = teams[i];
      const team2 = teams[i + 1];

      if (team2 === undefined) {
        matches.push({
          id: roundNumber * matchesPerRound + i,
          team1: team1.name,
          team2: "BYE",
          stationId: null,
          scoreTeam1: null,
          scoreTeam2: null,
          status: "Upcoming",
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
        continue;
      }

      shuffleArray(availableStations);
      const selectedStation = availableStations[0];

      matches.push({
        id: roundNumber * matchesPerRound + i,
        team1: team1.name,
        team2: team2.name,
        stationId: selectedStation.id,
        scoreTeam1: null,
        scoreTeam2: null,
        status: "Upcoming",
      });

      teamStationMap[team1.name].add(selectedStation.id);
      teamStationMap[team2.name].add(selectedStation.id);
      teamGamesCount[team1.name]++;
      teamGamesCount[team2.name]++;
      matchups.add(createMatchupKey(team1.name, team2.name));
      matchups.add(createMatchupKey(team2.name, team1.name));
    }

    if (matches.length > 0) {
      rounds.push({
        roundNumber: roundNumber,
        matches: matches,
      });
      roundNumber++;
    }

    // Check if all teams have played at least the minimum required games
    if (teams.every((team) => teamGamesCount[team.name] >= minGamesPerTeam)) {
      break;
    }
  }

  // Check if any team has fewer games than the minimum required and log an error if so
  teams.forEach((team) => {
    if (teamGamesCount[team.name] < minGamesPerTeam) {
      console.error(
        `Team ${team.name} has only ${teamGamesCount[team.name]} games.`
      );
    }
  });

  return rounds;
};

const schedule = generateSchedule(
  teams,
  stations.stations,
  minGamesPerTeam,
  maxGamesPerTeam
);

const scheduleData = {
  schedule: schedule,
  groupStageActive: false, // Initialize groupStageActive flag
  groupStageOver: false, // Initialize groupStageOver flag
};

fs.writeFileSync(
  path.join(__dirname, "schedules.json"),
  JSON.stringify(scheduleData, null, 2),
  "utf8"
);

console.log("Schedule generated and saved to schedules.json");
