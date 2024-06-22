"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateStandings } from "./utils/calculateStandings";
// import { scheduleA, scheduleB } from "./data/schedule"; // Import your schedules
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { TeamStanding } from "./interfaces/TeamStanding";
import { useSchedules } from "./hooks/useSchedules";
import useTeams from "./hooks/useTeams";
import useTeam from "./hooks/useTeam";
import { useTheme } from "next-themes";
import EndedLabel from "./components/EndedLabel";
import LiveLabel from "./components/LiveLabel";
import { Label } from "@/components/ui/label";
import NotStartedLabel from "./components/NotStartedLabel";

export default function Home() {
  const { schedule, groupStageActive, groupStageOver, loading, error } =
    useSchedules();
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const teamsData = useTeams();
  const [teams, setTeams] = useState<any[]>([]);
  const userTeam = useTeam();
  const theme = useTheme();
  const notStarted = !groupStageActive && !groupStageOver;

  useEffect(() => {
    if (teamsData) {
      setTeams(teamsData.teams);
    }
  }, [teamsData]);

  useEffect(() => {
    if (schedule) {
      try {
        const teamsList = teams.map((team) => team.name); // Extract team names from the teams data
        const matches = schedule.flatMap((round: any) => round.matches);
        setStandings(calculateStandings(teamsList, matches));
      } catch (error) {
        console.error("Failed to calculate standings", error);
      }
    }
  }, [schedule, teams]);

  return (
    <div className="grid grid-cols-1 w-full items-start justify-start gap-4">
      {/* <h1 className="text-3xl font-bold">Standings</h1> */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center w-full p-4">
          <p className="text-lg font-semibold">Standings</p>
          {groupStageActive ? (
            <LiveLabel />
          ) : groupStageOver ? (
            <EndedLabel />
          ) : null}
          {notStarted ? <NotStartedLabel /> : null}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead className="min-w-[120px]">Team</TableHead>
                  <TableHead>Record</TableHead>
                  <TableHead className="min-w-[75px]">Win %</TableHead>
                  <TableHead>Games Played</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standings.map((standing) => {
                  const team = teams.find(
                    (team) => team.name === standing.team
                  );
                  const isUserTeam = userTeam === standing.team;

                  return (
                    <TableRow
                      key={standing.team}
                      className={
                        isUserTeam
                          ? "bg-yellow-200 dark:bg-yellow-600 dark:text-gray-900"
                          : ""
                      }
                    >
                      <TableCell>{standing.position}</TableCell>
                      <TableCell className="min-w-fit">
                        {team ? `${team.name} ${team.flag} ` : standing.team}
                      </TableCell>
                      <TableCell>
                        {standing.won} - {standing.lost}
                      </TableCell>
                      <TableCell>
                        {isNaN(standing.winPercentage)
                          ? "N/A"
                          : (standing.winPercentage * 100).toFixed(0) + "%"}
                      </TableCell>
                      <TableCell>{standing.played}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
