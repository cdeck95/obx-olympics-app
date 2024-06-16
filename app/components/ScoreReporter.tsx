import { Game } from "@g-loot/react-tournament-brackets";
import React, { useState } from "react";

interface ScoreReporterProps {
  match: Game;
  onSave: (matchId: string, score1: number, score2: number) => void;
  onClose: () => void;
}

const ScoreReporter: React.FC<ScoreReporterProps> = ({
  match,
  onSave,
  onClose,
}) => {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const handleSave = () => {
    onSave(match.id, score1, score2);
    onClose();
  };

  return (
    <div className="score-reporter-modal">
      <h2>Report Score</h2>
      <p>Station: {match.station}</p>
      <p>
        {match.participants[0].name} vs {match.participants[1].name}
      </p>
      <div>
        <input
          type="number"
          value={score1}
          onChange={(e) => setScore1(parseInt(e.target.value))}
        />
        <span> vs </span>
        <input
          type="number"
          value={score2}
          onChange={(e) => setScore2(parseInt(e.target.value))}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ScoreReporter;
