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
import LiveLabel from "../components/LiveLabel";
import EndedLabel from "../components/EndedLabel";
import NotStartedLabel from "../components/NotStartedLabel";

export default function Schedule() {
  const {
    scheduleRounds,
    scheduleMatches,
    loading,
    error,
    groupStageActive,
    groupStageOver,
  } = useSchedules();
  console.log("Schedule Rounds:", scheduleRounds);
  console.log("Schedule Matches:", scheduleMatches);
  const teamsData = useTeams();
  const [teams, setTeams] = useState<Team[]>([]);
  const { team, setTeam } = useTeam();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(team || null);
  const notStarted = !groupStageActive && !groupStageOver;

  useEffect(() => {
    if (teamsData) {
      setTeams(teamsData.teams);
      if (!team) {
        setSelectedTeam(teamsData.teams[0].name);
      } else {
        setSelectedTeam(team);
      }
    }
  }, [teamsData, team]);

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 w-full gap-4">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 w-full gap-4 p-0">
          {/* <h1 className="text-2xl font-bold">Schedule</h1> */}
          <Tabs defaultValue="byTeam">
            <TabsList>
              <TabsTrigger value="byTeam">By Team</TabsTrigger>
              <TabsTrigger value="byRound">By Round</TabsTrigger>
            </TabsList>
            <TabsContent value="byTeam">
              <Card className="grid grid-cols-1 w-full h-full p-2 lg:p-4">
                <CardHeader className="flex flex-row justify-between items-center p-4 unset">
                  <CardTitle className="text-md lg:text-lg">
                    Schedule by Team
                  </CardTitle>
                  {groupStageActive ? (
                    <LiveLabel />
                  ) : groupStageOver ? (
                    <EndedLabel />
                  ) : null}
                  {notStarted ? <NotStartedLabel /> : null}
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-1 gap-8 w-full">
                  <TeamSelector
                    teams={teams}
                    selectedTeam={selectedTeam!}
                    onSelect={setSelectedTeam}
                  />{" "}
                  {selectedTeam && scheduleMatches && (
                    <TeamMatches
                      matches={scheduleMatches}
                      selectedTeam={selectedTeam}
                      teams={teams}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="byRound">
              <Card className="grid grid-cols-1 w-full h-full p-4">
                <CardHeader className="flex flex-row justify-between items-center p-4 unset">
                  <CardTitle>Schedule by Round</CardTitle>
                  {groupStageActive ? (
                    <LiveLabel />
                  ) : groupStageOver ? (
                    <EndedLabel />
                  ) : null}
                  {notStarted ? <NotStartedLabel /> : null}
                </CardHeader>
                {scheduleRounds && (
                  <CardContent className="p-4 grid grid-cols-1 gap-8 w-full">
                    {scheduleRounds.map((round, index) => {
                      return (
                        <div key={index}>
                          <Label>Round {index}</Label>
                          <RoundMatches matches={round.matches} teams={teams} />
                        </div>
                      );
                    })}
                  </CardContent>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
