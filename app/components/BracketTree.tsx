import React from "react";
import { Bracket } from "react-tournament-bracket";
import { BracketMatch } from "../interfaces/BracketMatch";

interface BracketTreeProps {
  playInMatch: BracketMatch;
  mainBracket: BracketMatch[];
}

const BracketTree: React.FC<BracketTreeProps> = ({
  playInMatch,
  mainBracket,
}) => {
  console.log("PlayInMatch", playInMatch);
  console.log("MainBracket", mainBracket);

  const renderBracket = (match: BracketMatch) => (
    <div
      key={match.id}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Bracket game={match} />
      {match.children.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {match.children.map(renderBracket)}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h2>Play-In Game</h2>
      {renderBracket(playInMatch)}
      <h2>Main Bracket</h2>
      {mainBracket.map(renderBracket)}
    </div>
  );
};

export default BracketTree;
