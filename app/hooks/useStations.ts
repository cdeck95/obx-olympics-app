import { useEffect, useState } from "react";

export interface Station {
  id: number;
  name: string;
  hasMultipleBoards: boolean;
}

interface StationsData {
  stations: Station[];
}

const useStations = () => {
  const [stationsData, setStationsData] = useState<StationsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("/api/loadStations");
        if (!response.ok) {
          throw new Error("Failed to load stations");
        }
        const data = await response.json();
        setStationsData(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  return { stationsData, loading, error };
};

export default useStations;
