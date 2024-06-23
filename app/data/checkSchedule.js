const fs = require("fs");

const checkSchedule = (scheduleData) => {
  const schedule = scheduleData.schedule;

  if (!Array.isArray(schedule)) {
    throw new Error("Invalid schedule format. 'schedule' should be an array.");
  }

  const teamStations = {};
  const stationUsagePerRound = {};

  schedule.forEach((match) => {
    const { team1, team2, station, roundNumber } = match;

    if (station === null || team1 === "BYE" || team2 === "BYE") {
      return;
    }

    if (!teamStations[team1]) {
      teamStations[team1] = {};
    }
    if (!teamStations[team2]) {
      teamStations[team2] = {};
    }

    if (!teamStations[team1][station.id]) {
      teamStations[team1][station.id] = 0;
    }
    if (!teamStations[team2][station.id]) {
      teamStations[team2][station.id] = 0;
    }

    teamStations[team1][station.id]++;
    teamStations[team2][station.id]++;

    if (!stationUsagePerRound[roundNumber]) {
      stationUsagePerRound[roundNumber] = {};
    }

    if (!stationUsagePerRound[roundNumber][station.id]) {
      stationUsagePerRound[roundNumber][station.id] = 0;
    }

    stationUsagePerRound[roundNumber][station.id]++;
  });

  console.log(JSON.stringify(teamStations, null, 2));
  console.log(JSON.stringify(stationUsagePerRound, null, 2));

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

  Object.keys(stationUsagePerRound).forEach((roundNumber) => {
    Object.keys(stationUsagePerRound[roundNumber]).forEach((stationId) => {
      const station = schedule.find(
        (match) => match.station && match.station.id == stationId
      ).station;

      if (
        stationUsagePerRound[roundNumber][stationId] > 1 &&
        !station.hasMultipleBoards
      ) {
        console.error(
          `Error: Station ${station.name} is used more than once in round ${roundNumber} but does not have multiple boards.`
        );
        hasErrors = true;
      }
    });
  });

  const rounds = schedule.reduce((acc, match) => {
    const round = match.roundNumber;
    if (!acc[round]) {
      acc[round] = [];
    }
    acc[round].push(match);
    return acc;
  }, {});

  const roundsWithIssues = Object.values(rounds).filter(
    (round) => round.length < 3
  );
  const tooManyRounds = Object.keys(rounds).length > 6;

  if (roundsWithIssues.length > 0) {
    roundsWithIssues.forEach((round) => {
      console.error(
        `Error: Round ${round[0].roundNumber} has only ${round.length} matches.`
      );
    });
    hasErrors = true;
  }

  if (tooManyRounds) {
    console.error("Error: Schedule has more than 6 rounds.");
    hasErrors = true;
  }

  if (hasErrors) {
    console.error(
      "Schedule has errors. Please review the above error messages."
    );
    return { valid: false };
  } else {
    console.log("Schedule is valid.");
    return { valid: true };
  }
};

module.exports = checkSchedule;
