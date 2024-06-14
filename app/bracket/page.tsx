"use client";

import React, { useState } from "react";
import ScoreReporter from "../components/ScoreReporter";
import { Match } from "../interfaces/Match";

const initialMatches: Match[] = [
  // Populate with initial matches
];

const Home: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(initialMatches);

  const handleScoreUpdate = (
    matchId: number,
    scoreTeam1: number,
    scoreTeam2: number
  ) => {
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.id === matchId ? { ...match, scoreTeam1, scoreTeam2 } : match
      )
    );
  };

  return (
    <main className="flex flex-col min-h-screen w-full items-start justify-center p-8 gap-4">
      <div className="grid grid-col-1 w-full items-start justify-center gap-4">
        <h1>Match Scores</h1>
        <ScoreReporter matches={matches} onScoreUpdate={handleScoreUpdate} />
      </div>
    </main>
  );
};

export default Home;
