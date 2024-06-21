const fs = require("fs");

// Read the JSON file
const scheduleData = JSON.parse(
  fs.readFileSync("app/data/schedules.json", "utf8")
);

// Initialize an empty object to store the occurrences of stationId per team
const teamStations = {};

// Iterate through each round and match in the schedule
scheduleData.schedule.forEach((round) => {
  round.matches.forEach((match) => {
    const { team1, team2, stationId } = match;

    if (!teamStations[team1]) {
      teamStations[team1] = {};
    }
    if (!teamStations[team2]) {
      teamStations[team2] = {};
    }

    if (!teamStations[team1][stationId]) {
      teamStations[team1][stationId] = 0;
    }
    if (!teamStations[team2][stationId]) {
      teamStations[team2][stationId] = 0;
    }

    teamStations[team1][stationId]++;
    teamStations[team2][stationId]++;
  });
});

// Print the occurrences of each stationId per team
console.log(JSON.stringify(teamStations, null, 2));
