import { useState, useEffect } from "react";
import { Round } from "../interfaces/Round";
import { Match } from "../interfaces/Match";

export const useSchedules = () => {
  const [scheduleRounds, setScheduleRounds] = useState<Round[] | null>(null);
  const [scheduleMatches, setScheduleMatches] = useState<Match[] | null>(null);
  const [groupStageActive, setGroupStageActive] = useState<boolean>(false);
  const [groupStageOver, setGroupStageOver] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadSchedules = async () => {
    try {
      const schedulesResponse = await fetch("/api/loadSchedules");

      if (!schedulesResponse.ok) {
        throw new Error("Error loading schedules");
      }

      const schedulesData = await schedulesResponse.json();

      console.log("Schedules data:", schedulesData);

      const matches = schedulesData.schedule as Match[];

      // Group matches by roundNumber
      const roundsMap: { [key: number]: Match[] } = {};
      matches.forEach((match) => {
        if (!roundsMap[match.roundNumber]) {
          roundsMap[match.roundNumber] = [];
        }
        roundsMap[match.roundNumber].push(match);
      });

      // Convert the map to an array of rounds
      const rounds = Object.keys(roundsMap).map((roundNumber) => {
        return {
          roundNumber: parseInt(roundNumber),
          matches: roundsMap[parseInt(roundNumber)],
        };
      });

      console.log("Rounds:", rounds);
      console.log("Matches:", matches);

      setScheduleRounds(rounds);
      setScheduleMatches(matches);
      setGroupStageActive(schedulesData.groupStageActive);
      setGroupStageOver(schedulesData.groupStageOver);
      setLoading(false);
    } catch (error: any) {
      console.error("An error occurred:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  return {
    scheduleRounds,
    scheduleMatches,
    groupStageActive,
    groupStageOver,
    loading,
    error,
    loadSchedules,
  };
};
