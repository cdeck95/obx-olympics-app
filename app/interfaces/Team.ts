// interfaces/Team.ts
export interface Team {
  id: number;
  name: string;
  flag: string;
  gamesPlayed: number;
  stationHistory: string[]; // To keep track of which stations they've already played at
}
