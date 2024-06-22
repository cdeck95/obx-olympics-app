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

    // Ignore cases where the station is null or the team is BYE
    if (stationId === null || team1 === "BYE" || team2 === "BYE") {
      return;
    }

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

// Check for any team playing at a station more than once
let hasErrors = false;
Object.keys(teamStations).forEach((team) => {
  Object.keys(teamStations[team]).forEach((stationId) => {
    if (teamStations[team][stationId] > 1) {
      console.error(
        `Error: Team ${team} is scheduled to play at station ${stationId} more than once.`
      );
      hasErrors = true;
    }
  });
});

// Check for rounds having less than 3 matches or more than 6 rounds
const roundsWithIssues = scheduleData.schedule.filter(
  (round) => round.matches.length < 3
);
const tooManyRounds = scheduleData.schedule.length > 6;

if (roundsWithIssues.length > 0) {
  roundsWithIssues.forEach((round) => {
    console.error(
      `Error: Round ${round.roundNumber} has only ${round.matches.length} matches.`
    );
  });
  hasErrors = true;
}

if (tooManyRounds) {
  console.error("Error: Schedule has more than 6 rounds.");
  hasErrors = true;
}

if (hasErrors) {
  console.error("Schedule has errors. Please review the above error messages.");
} else {
  console.log("Schedule is valid.");
}
