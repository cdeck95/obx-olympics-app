import React from "react";
import { BracketGenerator } from "react-tournament-bracket";
import { Game } from "react-tournament-bracket/lib/components/model";

interface BracketTreeProps {
  mainBracket: Game[];
}

const BracketTree: React.FC<BracketTreeProps> = ({ mainBracket }) => {
  return (
    <div className="bracket-tree">
      <BracketGenerator games={mainBracket} />
    </div>
  );
};

export default BracketTree;
