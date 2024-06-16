import { Game } from "@g-loot/react-tournament-brackets";

export interface Team {
  id: string;
  name: string;
}

export interface Score {
  score: number;
}

export interface Seed {
  displayName: string;
  rank: number;
  sourceGame?: Game; // Optional sourceGame
  sourcePool?: object;
}

export interface Side {
  team: Team;
  score: Score;
  seed: Seed;
}

export interface Sides {
  home: Side;
  visitor: Side;
}

export interface BracketMatch {
  id: string;
  name: string;
  scheduled: number;
  sides: Sides;
}
