// components/ScheduleDisplay.tsx
import React from "react";
import { scheduleA } from "../data/schedule";
import { scheduleB } from "../data/schedule";
import { Match } from "../interfaces/Match";

const ScheduleDisplay: React.FC = () => (
  <div>
    <h1>Schedule for Group A</h1>
    {scheduleA.map((round) => (
      <div key={round.roundNumber}>
        <h2>Round {round.roundNumber}</h2>
        {round.matches.map((match: Match) => (
          <div key={match.id}>
            {match.team1} vs {match.team2} at {match.station.name}
          </div>
        ))}
      </div>
    ))}
    <h1>Schedule for Group B</h1>
    {scheduleB.map((round) => (
      <div key={round.roundNumber}>
        <h2>Round {round.roundNumber}</h2>
        {round.matches.map((match: Match) => (
          <div key={match.id}>
            {match.team1} vs {match.team2} at {match.station.name}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default ScheduleDisplay;
