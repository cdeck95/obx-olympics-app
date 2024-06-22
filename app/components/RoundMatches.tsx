import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Match } from "../interfaces/Match";
import { Label } from "@/components/ui/label";
import { Round } from "../interfaces/Round";
import { ClipboardPenLine, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Team } from "../interfaces/Team";

interface RoundMatchesProps {
  round: Round;
  teams: Team[];
}

const RoundMatches: React.FC<RoundMatchesProps> = ({ round, teams }) => {
  return (
    <div className="h-full w-full grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {round.matches.map((match, index) => {
        const team1 = teams.find((team) => team.name === match.team1);
        const team2 = teams.find((team) => team.name === match.team2);

        if (!team1 || !team2) return null;

        return (
          <Card className="text-left w-full" key={index}>
            <CardHeader className="p-4">
              <CardDescription
                className="text-balance leading-relaxed items-center flex flex-row justify-between w-full"
                style={{ gridTemplateColumns: "60% 40%" }}
              >
                <Label className="min-w-fit text-xs">
                  Round {match.roundNumber}
                </Label>
                <Label className="flex flex-row text-xs min-w-fit gap-1 justify-end items-center">
                  <MapPin className="h-3 w-3" />
                  {match.station!.name}
                </Label>
              </CardDescription>

              <CardTitle>
                {team1.name} vs {team2.name}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-row gap-4 w-full justify-between items-end md:flex-row lg:flex-row p-4">
              <div className="flex flex-col gap-4 justify-start items-start p-0 m-0 w-full md:flex-col lg:flex-col">
                <div className="flex flex-row gap-1 items-center justify-start">
                  <ClipboardPenLine className="h-4 w-4" />
                  <Label className="text-xs">
                    Score: {team1.flag} {match.scoreTeam1 ?? "TBD"} -{" "}
                    {team2.flag} {match.scoreTeam2 ?? "TBD"}
                  </Label>
                </div>
                <div className="flex flex-row gap-1 items-center justify-start">
                  <Badge
                    className={`text-xs ${
                      match.status === "upcoming"
                        ? "bg-gray-200"
                        : match.status === "in-progress"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {match.status}
                  </Badge>
                </div>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default RoundMatches;
