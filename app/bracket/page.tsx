"use client";

import React, { useEffect, useState } from "react";
import { Match } from "../interfaces/Match";
import { createBracketData } from "../data/bracket";
import { TeamStanding } from "../interfaces/TeamStanding";
import { calculateStandings } from "../utils/calculateStandings";
import { BracketMatch } from "../interfaces/BracketMatch";
import BracketTree from "../components/BracketTree";
import { loadDataUtil, saveDataUtil } from "../utils/dataUtils";
import { toast } from "@/components/ui/use-toast";
import { simulateGroupPlay } from "../utils/simulateGroupPlay";
import { useSchedules } from "../hooks/useSchedules";
import useTeams from "../hooks/useTeams";
import { Game } from "@g-loot/react-tournament-brackets";
import LiveLabel from "../components/LiveLabel";
import EndedLabel from "../components/EndedLabel";
import NotStartedLabel from "../components/NotStartedLabel";

const BracketDisplay: React.FC = () => {
  const [bracketData, setBracketData] = useState<Game[]>([]);
  const {
    scheduleMatches,
    scheduleRounds,
    bracketPlayLive,
    bracketPlayOver,
    loading,
    error,
  } = useSchedules();
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const teamsData = useTeams();
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    if (teamsData) {
      setTeams(teamsData.teams);
    }
  }, [teamsData]);

  useEffect(() => {
    if (scheduleRounds) {
      try {
        const teamsList = teams.map((team) => team.name); // Extract team names from the teams data
        const matches = scheduleRounds.flatMap((round: any) => round.matches);
        setStandings(calculateStandings(teamsList, matches));
        console.log("Standings:", standings);
      } catch (error) {
        console.error("Failed to calculate standings", error);
      }
    }
  }, [scheduleRounds, teams]);

  const handleSaveData = async (data: any) => {
    try {
      await saveDataUtil({ bracketMatches: data, bracketPlayLive: true });
      toast({ title: "Data saved successfully", variant: "default" });
    } catch (error) {
      console.error("Error saving data:", error);
      toast({ title: "Error saving data", variant: "destructive" });
    }
  };

  const initializeBracket = () => {
    if (standings.length > 0) {
      const bracket = createBracketData(standings);
      console.log("Bracket data:", bracket);
      setBracketData(bracket);
      handleSaveData(bracket);
    }
  };

  useEffect(() => {
    if (bracketData.length === 0 && standings.length > 0) {
      initializeBracket();
    }
  }, [standings]);

  const notStarted = !bracketPlayLive && !bracketPlayOver;

  return (
    <div className="grid grid-cols-1 min-h-screen w-full text-center items-start">
      <div className="flex flex-row w-full justify-center gap-8 items-center">
        <h1>Tournament Bracket</h1>
        {bracketPlayLive ? (
          <LiveLabel />
        ) : bracketPlayOver ? (
          <EndedLabel />
        ) : null}
        {notStarted ? <NotStartedLabel /> : null}
      </div>

      {bracketData.length > 0 && (
        <div className="grid grid-cols-1 w-full h-full items-start justify-start gap-4">
          <BracketTree mainBracket={bracketData} />
        </div>
      )}
    </div>
  );
};

export default BracketDisplay;
