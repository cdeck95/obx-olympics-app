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

// Helper function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Generate the schedule
const generateSchedule = (teams, stations, minGames, maxGames) => {
  const rounds = [];
  const teamStationMap = {};
  const teamGamesCount = {};
  const matchups = new Set();

  // Initialize teamStationMap and teamGamesCount
  teams.forEach((team) => {
    teamStationMap[team.name] = {};
    teamGamesCount[team.name] = 0;
    stations.forEach((station) => {
      teamStationMap[team.name][station.id] = 0;
    });
  });

  let roundNumber = 1;

  while (true) {
    const matches = [];
    shuffleArray(teams);
    shuffleArray(stations);

    for (let i = 0; i < teams.length - 1; i += 2) {
      const team1 = teams[i].name;
      const team2 = teams[i + 1].name;
      const station = stations[i % stations.length];

      const matchupKey = `${team1}-${team2}`;

      // Ensure no team plays at the same station more than once, no team plays the same opponent more than once, and each team plays 4 or 5 games
      if (
        !matchups.has(matchupKey) &&
        teamStationMap[team1][station.id] < 1 &&
        teamStationMap[team2][station.id] < 1 &&
        teamGamesCount[team1] < maxGames &&
        teamGamesCount[team2] < maxGames
      ) {
        matches.push({
          id: (rounds.length * teams.length) / 2 + i / 2 + 1,
          team1,
          team2,
          stationId: station.id,
          scoreTeam1: null,
          scoreTeam2: null,
          status: "upcoming",
        });
        teamStationMap[team1][station.id]++;
        teamStationMap[team2][station.id]++;
        teamGamesCount[team1]++;
        teamGamesCount[team2]++;
        matchups.add(matchupKey);
        matchups.add(`${team2}-${team1}`); // Ensure the reverse matchup is also added
      }
    }

    if (matches.length > 0) {
      rounds.push({
        roundNumber: roundNumber,
        matches: matches,
      });
      roundNumber++;
    }

    // Check if all teams have played at least the minimum required games
    if (teams.every((team) => teamGamesCount[team.name] >= minGames)) {
      break;
    }
  }

  // Check if any team has fewer games than the minimum required and log an error if so
  teams.forEach((team) => {
    if (teamGamesCount[team.name] < minGames) {
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
};

fs.writeFileSync(
  path.join(__dirname, "schedules.json"),
  JSON.stringify(scheduleData, null, 2),
  "utf8"
);

console.log("Schedule generated and saved to schedules.json");
