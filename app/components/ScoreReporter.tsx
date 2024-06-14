// components/ScoreReporter.tsx
import React, { useState } from "react";
import { Match } from "../interfaces/Match";

interface Props {
  matches: Match[];
  onScoreUpdate: (
    matchId: number,
    scoreTeam1: number,
    scoreTeam2: number
  ) => void;
}

const ScoreReporter: React.FC<Props> = ({ matches, onScoreUpdate }) => {
  const handleScoreChange = (
    matchId: number,
    team: "team1" | "team2",
    value: string
  ) => {
    const score = parseInt(value, 10) || 0; // This ensures a number is always passed
    const matchIndex = matches.findIndex((match) => match.id === matchId);
    if (matchIndex > -1) {
      const updatedMatch = { ...matches[matchIndex] };
      if (team === "team1") {
        updatedMatch.scoreTeam1 = score;
      } else {
        updatedMatch.scoreTeam2 = score;
      }
      onScoreUpdate(
        matchId,
        updatedMatch.scoreTeam1 || 0,
        updatedMatch.scoreTeam2 || 0
      );
    }
  };

  return (
    <div>
      {matches.map((match) => (
        <div key={match.id} style={{ marginBottom: "20px" }}>
          <div>
            {match.team1} vs {match.team2} at {match.station.name}
          </div>
          <input
            type="number"
            value={match.scoreTeam1}
            onChange={(e) =>
              handleScoreChange(match.id, "team1", e.target.value)
            }
            placeholder="Score for Team 1"
          />
          <input
            type="number"
            value={match.scoreTeam2}
            onChange={(e) =>
              handleScoreChange(match.id, "team2", e.target.value)
            }
            placeholder="Score for Team 2"
          />
        </div>
      ))}
    </div>
  );
};

export default ScoreReporter;
