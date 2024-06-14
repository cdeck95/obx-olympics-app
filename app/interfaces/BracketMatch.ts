// interfaces/BracketMatch.ts
export interface Team {
  id: string;
  name: string;
}

export interface Score {
  score: number;
}

export interface Side {
  team: Team;
  score: Score;
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
  children: BracketMatch[];
}
