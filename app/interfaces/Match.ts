import { Station } from "./Station";

export interface Match {
  id: number;
  team1: string;
  team2: string;
  scoreTeam1?: number;
  scoreTeam2?: number;
  station: Station;
  status: "upcoming" | "in-progress" | "completed";
}
