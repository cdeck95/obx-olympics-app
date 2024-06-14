import { Round } from "../interfaces/Round";
import { stations } from "./stations";

// Sample full schedule for Group A
export const scheduleA: Round[] = [
  {
    roundNumber: 1,
    matches: [
      {
        id: 1,
        team1: "Mexico",
        team2: "Germany",
        station: stations[0],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Polish Horseshoes
      {
        id: 2,
        team1: "Italy",
        team2: "Greece",
        station: stations[3],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Flip Cup
    ],
  },
  {
    roundNumber: 2,
    matches: [
      {
        id: 3,
        team1: "Ireland",
        team2: "Mexico",
        station: stations[4],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Can Jam
      {
        id: 4,
        team1: "Germany",
        team2: "Italy",
        station: stations[5],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Tic Tac Toe Flip Cup
    ],
  },
  {
    roundNumber: 3,
    matches: [
      {
        id: 5,
        team1: "Greece",
        team2: "Ireland",
        station: stations[1],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Pong
      {
        id: 6,
        team1: "Mexico",
        team2: "Italy",
        station: stations[2],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Cornhole
    ],
  },
  {
    roundNumber: 4,
    matches: [
      {
        id: 7,
        team1: "Germany",
        team2: "Greece",
        station: stations[4],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Can Jam
      {
        id: 8,
        team1: "Ireland",
        team2: "Italy",
        station: stations[0],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Polish Horseshoes
    ],
  },
  {
    roundNumber: 5,
    matches: [
      {
        id: 9,
        team1: "Mexico",
        team2: "Greece",
        station: stations[3],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Flip Cup
      {
        id: 10,
        team1: "Ireland",
        team2: "Germany",
        station: stations[1],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Pong
    ],
  },
];

// Sample full schedule for Group B
export const scheduleB: Round[] = [
  {
    roundNumber: 1,
    matches: [
      {
        id: 11,
        team1: "USA",
        team2: "Canada",
        station: stations[2],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Cornhole
      {
        id: 12,
        team1: "France",
        team2: "Australia",
        station: stations[0],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Polish Horseshoes
    ],
  },
  {
    roundNumber: 2,
    matches: [
      {
        id: 13,
        team1: "USA",
        team2: "France",
        station: stations[4],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Can Jam
      {
        id: 14,
        team1: "Canada",
        team2: "Australia",
        station: stations[3],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Flip Cup
    ],
  },
  {
    roundNumber: 3,
    matches: [
      {
        id: 15,
        team1: "USA",
        team2: "Australia",
        station: stations[5],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Tic Tac Toe Flip Cup
      {
        id: 16,
        team1: "France",
        team2: "Canada",
        station: stations[1],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Pong
    ],
  },
  {
    roundNumber: 4,
    matches: [
      {
        id: 17,
        team1: "USA",
        team2: "Canada",
        station: stations[0],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Polish Horseshoes
      {
        id: 18,
        team1: "France",
        team2: "Australia",
        station: stations[4],
        scoreTeam1: 0,
        scoreTeam2: 0,
        status: "upcoming",
      }, // Can Jam
    ],
  },
];
