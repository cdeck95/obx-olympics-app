import { useState, useEffect } from "react";
import { Round } from "../interfaces/Round";
import { Match } from "../interfaces/Match";
import { Game } from "@g-loot/react-tournament-brackets";

export const useSchedules = () => {
  const [scheduleRounds, setScheduleRounds] = useState<Round[] | null>(null);
  const [scheduleMatches, setScheduleMatches] = useState<Match[] | null>(null);
  const [bracketMatches, setBracketMatches] = useState<Game[] | null>(null);
  const [groupStageActive, setGroupStageActive] = useState<boolean>(false);
  const [groupStageOver, setGroupStageOver] = useState<boolean>(false);
  const [bracketPlayLive, setBracketPlayLive] = useState<boolean>(false);
  const [bracketPlayOver, setBracketPlayOver] = useState<boolean>(false);
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
      const bracketMatchesData = schedulesData.bracketMatches as Game[];

      // Group matches by roundNumber
      const groupMatchesByRound = (matches: Match[]): Round[] => {
        const roundsMap: { [key: number]: Match[] } = {};
        matches.forEach((match) => {
          if (!roundsMap[match.roundNumber]) {
            roundsMap[match.roundNumber] = [];
          }
          roundsMap[match.roundNumber].push(match);
        });

        // Convert the map to an array of rounds
        return Object.keys(roundsMap).map((roundNumber) => ({
          roundNumber: parseInt(roundNumber),
          matches: roundsMap[parseInt(roundNumber)],
        }));
      };

      const scheduleRounds = groupMatchesByRound(matches);

      console.log("Schedule Rounds:", scheduleRounds);
      console.log("Schedule Matches:", matches);
      console.log("Bracket Matches:", bracketMatchesData);

      setScheduleRounds(scheduleRounds);
      setScheduleMatches(matches);
      setBracketMatches(bracketMatchesData);
      setGroupStageActive(schedulesData.groupStageActive);
      setGroupStageOver(schedulesData.groupStageOver);
      setBracketPlayLive(schedulesData.bracketPlayLive);
      setBracketPlayOver(schedulesData.bracketPlayOver);
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
    bracketMatches,
    groupStageActive,
    groupStageOver,
    bracketPlayLive,
    bracketPlayOver,
    loading,
    error,
    loadSchedules,
  };
};
