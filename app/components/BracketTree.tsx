import React, { useEffect, useRef, useState } from "react";
import {
  SingleEliminationBracket,
  SVGViewer,
  Match,
  Game,
  createTheme,
} from "@g-loot/react-tournament-brackets";
import { useWindowSize } from "@uidotdev/usehooks";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import { useTheme } from "next-themes";
interface BracketTreeProps {
  mainBracket: Game[];
}

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setIsDarkMode(currentTheme === "dark");
  }, [theme, systemTheme]);

  return isDarkMode;
};

// const CustomTheme = createTheme({
//   textColor: {
//     main: "#002050",
//     highlighted: "#ffffff",
//     dark: "#000000",
//   },
//   matchBackground: {
//     wonColor: "#d9d9d9",
//     lostColor: "#ffac2f",
//   },
//   score: {
//     background: {
//       wonColor: "#002050",
//       lostColor: "#ffac2f",
//     },
//     text: {
//       highlightedWonColor: "#ffac2f",
//       highlightedLostColor: "#d9d9d9",
//     },
//   },
//   border: {
//     color: "#002050",
//     highlightedColor: "#ffffff",
//   },
//   roundHeader: {
//     backgroundColor: "#002050",
//     fontColor: "#ffffff",
//   },
//   connectorColor: "#d9d9d9",
//   connectorColorHighlight: "#ffac2f",
//   svgBackground: "#ffffff", // Default to white, will adjust for dark mode
// });

const BracketTree: React.FC<BracketTreeProps> = ({ mainBracket }) => {
  console.log("BracketTree mainBracket:", mainBracket);
  const containerRef = useRef<HTMLDivElement>(null);
  const [bracketHeight, setBracketHeight] = React.useState<number>(500);
  const [bracketWidth, setBracketWidth] = React.useState<number>(500);
  const size = useWindowSize();
  const isDarkMode = useDarkMode();

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          const finalWidth = Math.max(width - 20, 300); // Adjust the padding/margin as needed
          const finalHeight = Math.max(height - 20, 300); // Adjust the padding/margin as needed
          console.log(
            "BracketTree resizeObserver:",
            finalWidth,
            finalHeight,
            size.width,
            size.height
          );
          setBracketWidth(finalWidth);
          setBracketHeight(finalHeight);
        }
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [containerRef]);

  // Validate mainBracket data
  mainBracket.forEach((game, index) => {
    if (!game || !game.id || !game.participants) {
      console.error(`Invalid game data at index ${index}:`, game);
    } else {
      const participants = game.participants;
      participants.forEach((participant, pIndex) => {
        if (!participant.id) {
          console.error(
            `Invalid participant data at index ${index}, participant index ${pIndex}:`,
            participant
          );
        }
      });
    }
  });

  // const theme = {
  //   ...CustomTheme,
  //   svgBackground: isDarkMode ? "#000000" : "#ffffff",
  // };

  const svgBackground = isDarkMode ? "#000000" : "#ffffff";

  return (
    <div ref={containerRef} className="grid grid-cols-1 gap-4 w-full h-full">
      <SingleEliminationBracket
        matches={mainBracket}
        matchComponent={Match}
        //if we want the other vars like onMatchClick, topParty, etc... need to declare them in the delcaration interface
        // matchComponent={({ match }) => (
        //   <div
        //     className={`${
        //       match.state === "Live"
        //         ? "border-2 border-green-500 text-white"
        //         : ""
        //     }`}
        //   >
        //     <h3>{match.name}</h3>
        //     <p>{match.tournamentRoundText}</p>
        //     <div>
        //       {match.participants.map((participant) => (
        //         <div key={participant.id}>
        //           <span>{participant.name}</span>
        //           {participant.isWinner && <span> (Winner)</span>}
        //         </div>
        //       ))}
        //     </div>
        //   </div>
        // )}

        // theme={theme}
        // options={{
        //   style: {
        //     roundHeader: {
        //       backgroundColor: theme.roundHeader.backgroundColor,
        //       fontColor: theme.roundHeader.fontColor,
        //     },
        //     connectorColor: theme.connectorColor,
        //     connectorColorHighlight: theme.connectorColorHighlight,
        //   },
        // }}
        svgWrapper={({ children, ...props }) => (
          <UncontrolledReactSVGPanZoom
            background={svgBackground}
            SVGBackground={svgBackground}
            width={bracketWidth}
            height={bracketHeight}
          >
            {children}
          </UncontrolledReactSVGPanZoom>
        )}
      />
    </div>
  );
};

export default BracketTree;
