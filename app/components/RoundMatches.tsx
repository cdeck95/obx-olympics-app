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
import { ClipboardPenLine, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Team } from "../interfaces/Team";
import { Round } from "../interfaces/Round";

interface RoundMatchesProps {
  matches: Match[];
  teams: Team[];
}

const RoundMatches: React.FC<RoundMatchesProps> = ({ matches, teams }) => {
  return (
    <div className="h-full w-full grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {matches.map((match, index) => {
        const team1 = teams.find((team) => team.name === match.team1);
        const team2 = teams.find((team) => team.name === match.team2);

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
                {match.station && (
                  <Label className="flex flex-row text-xs min-w-fit gap-1 justify-end items-center">
                    <MapPin className="h-3 w-3" />
                    {match.station!.name}
                  </Label>
                )}
              </CardDescription>
              <CardTitle>
                {team1 ? team1.name : "BYE"} vs {team2 ? team2.name : "BYE"}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-row gap-4 w-full justify-between items-end md:flex-row lg:flex-row p-4">
              <div className="flex flex-col gap-4 justify-start items-start p-0 m-0 w-full md:flex-col lg:flex-col">
                {match.team1 !== "BYE" && match.team2 !== "BYE" && (
                  <>
                    <div className="flex flex-row gap-1 items-center justify-start">
                      <ClipboardPenLine className="h-4 w-4" />
                      <Label className="text-xs">
                        Score: {team1?.flag}{" "}
                        <span
                          className={
                            match.scoreTeam1 !== null &&
                            match.scoreTeam2 !== null
                              ? match.scoreTeam1 > match.scoreTeam2
                                ? "text-green-500"
                                : match.scoreTeam1 < match.scoreTeam2
                                ? "text-red-500"
                                : ""
                              : ""
                          }
                        >
                          {match.scoreTeam1 ?? "TBD"}
                        </span>{" "}
                        - {team2?.flag}{" "}
                        <span
                          className={
                            match.scoreTeam1 !== null &&
                            match.scoreTeam2 !== null
                              ? match.scoreTeam2 > match.scoreTeam1
                                ? "text-green-500"
                                : match.scoreTeam2 < match.scoreTeam1
                                ? "text-red-500"
                                : ""
                              : ""
                          }
                        >
                          {match.scoreTeam2 ?? "TBD"}
                        </span>
                      </Label>
                    </div>
                    <div className="flex flex-row w-full gap-1 items-center justify-between">
                      <Badge
                        variant={
                          match.status === "Upcoming"
                            ? "default"
                            : match.status === "Live"
                            ? "destructive"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {match.status}
                      </Badge>
                      {match.status === "Completed" && (
                        <Badge className="bg-green-800 text-white">
                          Winner:{" "}
                          {match.isWinnerTeam1 ? team1?.name : team2?.name}
                        </Badge>
                      )}
                    </div>
                  </>
                )}
                {/* {(match.team1 === "BYE" || match.team2 === "BYE") && (
                  <Label className="text-xs text-gray-500">
                    {selectedTeam} has a bye this round.
                  </Label>
                )} */}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default RoundMatches;
