import { useState, useEffect } from "react";
import { Round } from "../interfaces/Round";
import { Station } from "../interfaces/Station";
import { Match } from "../interfaces/Match";

export const useSchedules = () => {
  const [schedule, setSchedule] = useState<Round[] | null>(null);
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

        const mapScheduleWithStations = (schedule: Round[]) => {
          console.log("Mapping schedule with stations");
          return schedule.map((round: Round) => ({
            ...round,
            matches: round.matches.map((match) => ({
              ...match,
              station: mapStation(match.stationId),
              roundNumber: round.roundNumber, // Ensure roundNumber is included
            })),
          }));
        };

        const scheduleWithStations = mapScheduleWithStations(
          schedulesData.schedule
        );
        console.log("Schedule with stations:", scheduleWithStations);

        setSchedule(scheduleWithStations);
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
    loading,
    error,
  };
};
