import { Station } from "./Station";

export interface Match {
  id: number;
  team1: string;
  team2: string;
  // stationId: number;
  station: Station | null;
  scoreTeam1: number | null;
  scoreTeam2: number | null;
  status: string;
  roundNumber: number;
  isWinnerTeam1: boolean | null;
  isWinnerTeam2: boolean | null;
}
