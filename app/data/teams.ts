// data/teams.ts
import { Team } from "../interfaces/Team";

export const teams: Team[] = [
  { id: 1, name: "Mexico", group: "A", gamesPlayed: 0, stationHistory: [] },
  { id: 2, name: "Germany", group: "A", gamesPlayed: 0, stationHistory: [] },
  { id: 3, name: "Italy", group: "A", gamesPlayed: 0, stationHistory: [] },
  { id: 4, name: "Greece", group: "A", gamesPlayed: 0, stationHistory: [] },
  { id: 5, name: "Ireland", group: "A", gamesPlayed: 0, stationHistory: [] },
  { id: 6, name: "USA", group: "B", gamesPlayed: 0, stationHistory: [] },
  { id: 7, name: "Canada", group: "B", gamesPlayed: 0, stationHistory: [] },
  { id: 8, name: "France", group: "B", gamesPlayed: 0, stationHistory: [] },
  { id: 9, name: "Australia", group: "B", gamesPlayed: 0, stationHistory: [] },
];

export const groups = {
  A: teams.filter((team) => team.group === "A"),
  B: teams.filter((team) => team.group === "B"),
};
