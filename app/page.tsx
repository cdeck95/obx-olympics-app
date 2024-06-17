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

export default function Home() {
  const { schedule, loading, error } = useSchedules();
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const teamsData = useTeams();
  const [teams, setTeams] = useState<any[]>([]);

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
    <main className="flex flex-col min-h-screen w-full items-start justify-start p-8 gap-4">
      <div className="grid grid-cols-1 w-full items-start justify-start gap-4">
        {/* <h1 className="text-3xl font-bold">Standings</h1> */}
        <Card>
          <CardHeader>
            <p className="text-lg font-semibold">Standings</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Record</TableHead>
                    <TableHead>Win %</TableHead>
                    <TableHead>Games Played</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {standings.map((standing) => {
                    const team = teams.find(
                      (team) => team.name === standing.team
                    );
                    return (
                      <TableRow key={standing.team}>
                        <TableCell>{standing.position}</TableCell>
                        <TableCell>
                          {team ? `${team.flag} ${team.name}` : standing.team}
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
    </main>
  );
}
