"use client";

import { useEffect, useState } from "react";
import TeamSelector from "../components/TeamSelector";
// import { scheduleA } from "../data/schedule";
// import { scheduleB } from "../data/schedule";
import TeamMatches from "../components/TeamMatches";
import { Match } from "../interfaces/Match";
import { useSchedules } from "../hooks/useSchedules";
import useTeams from "../hooks/useTeams";
import { Round } from "../interfaces/Round";
import { Team } from "../interfaces/Team";
import useTeam from "../hooks/useTeam";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "path";
import { DataTable } from "../admin/data-table";
import RoundMatches from "../components/RoundMatches";
import { Label } from "@/components/ui/label";

export default function Schedule() {
  const { schedule, loading, error } = useSchedules();
  const teamsData = useTeams();
  const [teams, setTeams] = useState<Team[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const team = useTeam();
  console.log(team);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(team || null);

  useEffect(() => {
    if (teamsData) {
      setTeams(teamsData.teams);
      console.log("selected team", selectedTeam);
      console.log("loaded team", team);
      if (!team) {
        setSelectedTeam(teamsData.teams[0].name);
      } else {
        setSelectedTeam(team);
      }
    }
  }, [teamsData, team]);

  useEffect(() => {
    if (schedule) {
      console.log(schedule);
      setRounds(schedule);
    }
  }, [schedule]);

  console.log("Rounds", rounds);

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 w-full gap-4">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 w-full gap-4">
          {/* <h1 className="text-2xl font-bold">Schedule</h1> */}
          <Tabs defaultValue="byTeam">
            <TabsList>
              <TabsTrigger value="byTeam">By Team</TabsTrigger>
              <TabsTrigger value="byRound">By Round</TabsTrigger>
            </TabsList>
            <TabsContent value="byTeam">
              <Card className="grid grid-cols-1 w-full h-full p-4">
                <CardHeader className="grid grid-cols-1 p-4 unset">
                  <CardTitle>Schedule by Team</CardTitle>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-1 gap-8 w-full">
                  <TeamSelector
                    teams={teams}
                    selectedTeam={selectedTeam!}
                    onSelect={setSelectedTeam}
                  />{" "}
                  {selectedTeam && (
                    <TeamMatches
                      rounds={rounds}
                      selectedTeam={selectedTeam}
                      teams={teams}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="byRound">
              <Card className="grid grid-cols-1 w-full h-full p-4">
                <CardHeader>
                  <CardTitle>Schedule by Round</CardTitle>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-1 gap-8 w-full">
                  {rounds.map((round) => (
                    <div
                      key={round.roundNumber}
                      className="grid grid-cols-1 gap-4 w-full"
                    >
                      <Label className="text-xl">
                        Round {round.roundNumber}
                      </Label>

                      <RoundMatches
                        key={round.roundNumber}
                        round={round}
                        teams={teams}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
