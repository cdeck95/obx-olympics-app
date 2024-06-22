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

interface TeamMatchesProps {
  rounds: Round[];
  selectedTeam: string;
  teams: Team[];
}

const TeamMatches: React.FC<TeamMatchesProps> = ({
  rounds,
  selectedTeam,
  teams,
}) => {
  // Filter rounds to find matches that include the selected team
  const filteredMatches = rounds.map((round) => {
    const match = round.matches.find(
      (match) => match.team1 === selectedTeam || match.team2 === selectedTeam
    );
    if (match) {
      return {
        ...match,
        roundNumber: round.roundNumber, // Append round number to each match
      };
    } else {
      return {
        id: round.roundNumber, // Assign a numeric id
        roundNumber: round.roundNumber,
        team1: "BYE",
        team2: selectedTeam,
        stationId: -1,
        scoreTeam1: null,
        scoreTeam2: null,
        status: "upcoming",
      } as Match & { roundNumber: number };
    }
  });

  if (!selectedTeam) {
    return (
      <div className="text-center text-gray-500">
        Select a team to view the schedule.
      </div>
    );
  }

  return (
    <div className="h-full w-full grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredMatches.map((match, index) => {
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
                        Score: {team1?.flag} {match.scoreTeam1 ?? "TBD"} -{" "}
                        {team2?.flag} {match.scoreTeam2 ?? "TBD"}
                      </Label>
                    </div>
                    <div className="flex flex-row gap-1 items-center justify-start">
                      <Badge
                        variant={
                          match.status === "upcoming"
                            ? "default"
                            : match.status === "in-progress"
                            ? "destructive"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {match.status}
                      </Badge>
                    </div>
                  </>
                )}
                {(match.team1 === "BYE" || match.team2 === "BYE") && (
                  <Label className="text-xs text-gray-500">
                    {selectedTeam} has a bye this round.
                  </Label>
                )}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default TeamMatches;
