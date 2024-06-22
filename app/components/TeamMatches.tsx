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
  matches: Match[];
  selectedTeam: string;
  teams: Team[];
}

const TeamMatches: React.FC<TeamMatchesProps> = ({
  matches,
  selectedTeam,
  teams,
}) => {
  let id = 350;
  console.log("Matches:", matches);

  // Get the unique round numbers
  const roundNumbers = Array.from(
    new Set(matches.map((match) => match.roundNumber))
  );

  // Ensure the selected team is always team1 and include BYE matches
  const filteredMatches = roundNumbers.map((roundNumber) => {
    const match = matches.find(
      (match) =>
        (match.roundNumber === roundNumber && match.team1 === selectedTeam) ||
        (match.roundNumber === roundNumber && match.team2 === selectedTeam)
    );

    if (match) {
      if (match.team2 === selectedTeam) {
        // Swap team1 and team2 if the selected team is team2
        return {
          ...match,
          team1: match.team2,
          team2: match.team1,
          scoreTeam1: match.scoreTeam2,
          scoreTeam2: match.scoreTeam1,
          isWinnerTeam1: match.isWinnerTeam2,
          isWinnerTeam2: match.isWinnerTeam1,
        };
      }
      return match;
    } else {
      // Add a BYE match if no match is found for the selected team in this round
      return {
        id: id++,
        roundNumber,
        team1: "BYE",
        team2: selectedTeam,
        station: null,
        scoreTeam1: null,
        scoreTeam2: null,
        status: "Upcoming",
        isWinnerTeam1: null,
        isWinnerTeam2: null,
      } as Match;
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
                      {match.status === "Completed" && match.isWinnerTeam1 && (
                        <Badge className="bg-green-600 text-white">W</Badge>
                      )}
                      {match.status === "Completed" && match.isWinnerTeam2 && (
                        <Badge variant="destructive">L</Badge>
                      )}
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
