import { useState, useEffect } from "react";
import { Round } from "../interfaces/Round";
import { Station } from "../interfaces/Station";
import { Match } from "../interfaces/Match";

export const useSchedules = () => {
  const [schedule, setSchedule] = useState<Round[] | null>(null);
  const [groupStageActive, setGroupStageActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const schedulesResponse = await fetch("/api/loadSchedules");
        const stationsResponse = await fetch("/api/loadStations");

        if (!schedulesResponse.ok) {
          throw new Error("Error loading schedules");
        }
        if (!stationsResponse.ok) {
          throw new Error("Error loading stations");
        }

        const schedulesData = await schedulesResponse.json();
        const stationsData = await stationsResponse.json();

        console.log("Schedules data:", schedulesData);
        console.log("Stations data:", stationsData.stations);

        if (!Array.isArray(stationsData.stations)) {
          throw new Error("Stations data is not an array");
        }

        const mapStation = (stationId: number) => {
          return (
            stationsData.stations.find(
              (station: Station) => station.id === stationId
            ) || undefined
          );
        };

        const mapSchedulesWithStations = (schedules: Round[]) => {
          console.log("Mapping schedules with stations");
          console.log("Schedules:", schedules);
          return schedules.map((round: Round) => ({
            ...round,
            matches: round.matches.map((match) => ({
              ...match,
              station: mapStation(match.stationId),
            })),
          }));
        };

        setSchedule(mapSchedulesWithStations(schedulesData.schedule));
        setGroupStageActive(schedulesData.groupStageActive);
        setLoading(false);
      } catch (error: any) {
        console.error("An error occurred:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    loadSchedules();
  }, []);

  return {
    schedule,
    groupStageActive,
    loading,
    error,
  };
};
