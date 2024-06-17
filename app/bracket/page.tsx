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

const BracketDisplay: React.FC = () => {
  // const [groupAStandings, setGroupAStandings] = useState<TeamStanding[]>([]);
  // const [groupBStandings, setGroupBStandings] = useState<TeamStanding[]>([]);
  const [bracketData, setBracketData] = useState<any[]>([]);
  const { schedule, loading, error } = useSchedules();
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const teamsData = useTeams();
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    if (teamsData) {
      setTeams(teamsData.teams);
    }
  }, [teamsData]);

  useEffect(() => {
    if (schedule) {
      try {
        const teamsList = teams.map((team) => team.name); // Extract team names from the teams data
        const matches = schedule.flatMap((round: any) => round.matches);
        setStandings(calculateStandings(teamsList, matches));
        console.log("Standings:", standings);
      } catch (error) {
        console.error("Failed to calculate standings", error);
      }
    }
  }, [schedule, teams]);

  const handleSaveData = async (data: any) => {
    try {
      await saveDataUtil(data);
      alert("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };

  const handleLoadData = async () => {
    try {
      const data = await loadDataUtil();
      setBracketData(data.mainBracket);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Error loading data");
    }
  };

  useEffect(() => {
    const loadDataAsync = async () => {
      try {
        await handleLoadData(); // Load data on component mount

        if (bracketData.length === 0 && standings.length > 0) {
          // const { standingsA, standingsB } = simulateGroupPlay(
          //   scheduleA,
          //   scheduleB,
          //   groupA,
          //   groupB
          // );

          // setGroupAStandings(standingsA);
          // setGroupBStandings(standingsB);

          // const calculatedGroupAStandings = calculateStandings(
          //   groupA,
          //   scheduleA.flatMap((round) => round.matches)
          // );

          // const calculatedGroupBStandings = calculateStandings(
          //   groupB,
          //   scheduleB.flatMap((round) => round.matches)
          // );

          // setGroupAStandings(calculatedGroupAStandings);
          // setGroupBStandings(calculatedGroupBStandings);

          // const bracket = createBracketData(
          //   calculatedGroupAStandings,
          //   calculatedGroupBStandings
          // );

          console.log("Standings:", standings);
          const bracket = createBracketData(standings);
          console.log("Bracket data:", bracket);
          setBracketData(bracket);
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    loadDataAsync();
  }, [standings]);

  return (
    <div className="grid min-h-screen w-full text-center items-start">
      <h1>Tournament Bracket</h1>
      {bracketData.length > 0 && <BracketTree mainBracket={bracketData} />}
      <button onClick={() => handleSaveData({ mainBracket: bracketData })}>
        Save Data
      </button>
      <button onClick={handleLoadData}>Load Data</button>
    </div>
  );
};

export default BracketDisplay;
