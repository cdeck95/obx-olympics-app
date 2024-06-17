// components/TeamMatches.tsx
import React, { useState } from "react";
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
import useTeams from "../hooks/useTeams";
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
  const filteredMatches = rounds.flatMap((round) =>
    round.matches
      .filter(
        (match) => match.team1 === selectedTeam || match.team2 === selectedTeam
      )
      .map((match) => ({
        ...match,
        roundNumber: round.roundNumber, // Append round number to each match
      }))
  );

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
                <br />
                {team1.flag} vs {team2.flag}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-row gap-4 w-full justify-between items-end md:flex-row lg:flex-row p-4">
              <div className="flex flex-col gap-4 justify-start items-start p-0 m-0 w-full md:flex-col lg:flex-col">
                <div className="flex flex-row gap-1 items-center justify-start">
                  <ClipboardPenLine className="h-4 w-4" />
                  <Label className="text-xs">
                    Score: {match.scoreTeam1 ?? "TBD"} -{" "}
                    {match.scoreTeam2 ?? "TBD"}
                    {/* Score: {team1.flag} {match.scoreTeam1 ?? "TBD"} -{" "}
                    {team2.flag} {match.scoreTeam2 ?? "TBD"} */}
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

          // <Card key={match.id} className="shadow-md rounded-lg">
          //   <CardHeader>
          //     <CardTitle>Create Event</CardTitle>
          //     <h3 className="font-semibold">{match.station.name}</h3>
          //   </CardHeader>
          //   <CardContent>
          //     <p>
          //       {match.team1} vs {match.team2}
          //     </p>
          //     <p>Status: {match.status}</p>
          //     <p>
          //       Score: {match.scoreTeam1} - {match.scoreTeam2}
          //     </p>
          //   </CardContent>
          // </Card>
        );
      })}
    </div>
  );
};

export default TeamMatches;
