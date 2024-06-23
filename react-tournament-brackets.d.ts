declare module "@g-loot/react-tournament-brackets" {
  import * as React from "react";

  interface Participant {
    id: string;
    name: string;
    isWinner: boolean;
    resultText?: string | null;
    status?: string | null;
  }

  interface Game {
    id: string;
    name: string;
    nextMatchId: string | null;
    tournamentRoundText: string;
    startTime: string;
    state: string;
    participants: Participant[];
    station?: string; // Add this line
  }

  interface SVGViewerProps {
    width: number;
    height: number;
    background: string;
    SVGBackground: string;
    children: React.ReactNode;
  }

  interface Theme {
    textColor: {
      main: string;
      highlighted: string;
      dark: string;
    };
    matchBackground: {
      wonColor: string;
      lostColor: string;
    };
    score: {
      background: {
        wonColor: string;
        lostColor: string;
      };
      text: {
        highlightedWonColor: string;
        highlightedLostColor: string;
      };
    };
    border: {
      color: string;
      highlightedColor: string;
    };
    roundHeader: {
      backgroundColor: string;
      fontColor: string;
    };
    connectorColor: string;
    connectorColorHighlight: string;
    svgBackground: string;
  }

  export function createTheme(theme: Theme): Theme;

  export const SingleEliminationBracket: React.FC<{
    matches: Game[];
    matchComponent: React.FC<{ match: Game }>;
    theme?: Theme;
    options?: {
      style?: {
        roundHeader?: {
          backgroundColor?: string;
          fontColor?: string;
        };
        connectorColor?: string;
        connectorColorHighlight?: string;
      };
    };
    svgWrapper: React.FC<SVGViewerProps>;
  }>;

  export const DoubleEliminationBracket: React.FC<{
    matches: { upper: Game[]; lower: Game[] };
    matchComponent: React.FC<{ match: Game }>;
    theme?: Theme;
    options?: {
      style?: {
        roundHeader?: {
          backgroundColor?: string;
          fontColor?: string;
        };
        connectorColor?: string;
        connectorColorHighlight?: string;
      };
    };
    svgWrapper: React.FC<SVGViewerProps>;
  }>;

  export const Match: React.FC<{ match: Game }>;

  export const SVGViewer: React.FC<SVGViewerProps>;
}
