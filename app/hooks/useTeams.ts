import { useEffect, useState } from "react";

export interface Team {
  id: number;
  name: string;
  group: string;
  gamesPlayed: number;
  stationHistory: string[];
}

interface TeamsData {
  teams: Team[];
  groups: {
    A: number[];
    B: number[];
  };
}

const useTeams = () => {
  const [teamsData, setTeamsData] = useState<TeamsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/loadTeams");
        if (!response.ok) {
          throw new Error("Failed to load teams");
        }
        const data = await response.json();
        setTeamsData(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return teamsData;
};

export default useTeams;
