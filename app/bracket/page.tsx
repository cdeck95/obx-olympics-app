"use client";

import React, { useEffect, useState } from "react";
import ScoreReporter from "../components/ScoreReporter";
import { Match } from "../interfaces/Match";
import { createBracketData } from "../data/bracket";
import { Bracket } from "react-tournament-bracket";
import { TeamStanding } from "../interfaces/TeamStanding";
import { calculateStandings } from "../utils/calculateStandings";
import { scheduleA } from "../data/schedule";
import { scheduleB } from "../data/schedule";
import { Game } from "react-tournament-bracket/lib/components/model";
import { BracketMatch } from "../interfaces/BracketMatch";
import BracketTree from "../components/BracketTree";

const Home: React.FC = () => {
  const [groupAStandings, setGroupAStandings] = useState<TeamStanding[]>([]);
  const [groupBStandings, setGroupBStandings] = useState<TeamStanding[]>([]);
  const [bracketData, setBracketData] = useState<{
    playInMatch: Game;
    mainBracket: Game[];
  } | null>(null);

  useEffect(() => {
    const groupA = ["Mexico", "Germany", "Italy", "Greece", "Ireland"];
    const groupB = ["USA", "Canada", "France", "Australia"];

    const calculatedGroupAStandings = calculateStandings(
      groupA,
      scheduleA.flatMap((round) => round.matches)
    );

    const calculatedGroupBStandings = calculateStandings(
      groupB,
      scheduleB.flatMap((round) => round.matches)
    );

    setGroupAStandings(calculatedGroupAStandings);
    setGroupBStandings(calculatedGroupBStandings);

    const bracket = createBracketData(
      calculatedGroupAStandings,
      calculatedGroupBStandings
    );
    setBracketData(bracket);
  }, []);

  return (
    <main className="flex flex-col min-h-screen w-full items-start justify-start p-8 gap-4">
      {/* <div className="grid grid-col-1 w-full items-start justify-center gap-4">
        <h1>Match Scores</h1>
        <ScoreReporter matches={matches} onScoreUpdate={handleScoreUpdate} />
      </div> */}
      <div className="p-8">
        <h1 className="text-2xl font-bold">Tournament Bracket</h1>
        {bracketData && <BracketTree mainBracket={bracketData.mainBracket} />}
      </div>
    </main>
  );
};

export default Home;
