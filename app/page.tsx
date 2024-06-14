"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateStandings } from "./utils/calculateStandings";
import { scheduleA, scheduleB } from "./data/schedule"; // Import your schedules
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

export default function Home() {
  // Define the type of the state explicitly as an array of TeamStanding
  const [groupAStandings, setGroupAStandings] = useState<TeamStanding[]>([]);
  const [groupBStandings, setGroupBStandings] = useState<TeamStanding[]>([]);

  useEffect(() => {
    const groupA = ["Mexico", "Germany", "Italy", "Greece", "Ireland"];
    const groupB = ["USA", "Canada", "France", "Australia"];
    setGroupAStandings(
      calculateStandings(
        groupA,
        scheduleA.flatMap((round) => round.matches)
      )
    );
    setGroupBStandings(
      calculateStandings(
        groupB,
        scheduleB.flatMap((round) => round.matches)
      )
    );
  }, []);

  console.log("Group A Standings", groupAStandings);
  console.log("Group B Standings", groupBStandings);

  return (
    <main className="flex flex-col min-h-screen w-full items-start justify-center p-8 gap-4">
      <div className="grid grid-cols-1 w-full items-start justify-center gap-4">
        <h1 className="text-3xl font-bold">Standings</h1>
        <Tabs defaultValue="groupA" className="w-full">
          <TabsList>
            <TabsTrigger value="groupA">Group A</TabsTrigger>
            <TabsTrigger value="groupB">Group B</TabsTrigger>
          </TabsList>
          <TabsContent value="groupA">
            <Card>
              <CardHeader>
                <p className="text-lg font-semibold">Group A Standings</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team</TableHead>
                      <TableHead>Played</TableHead>
                      <TableHead>Won</TableHead>
                      <TableHead>Lost</TableHead>
                      <TableHead>Win %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupAStandings.map((standing) => (
                      <TableRow key={standing.team}>
                        <TableCell>{standing.team}</TableCell>
                        <TableCell>{standing.played}</TableCell>
                        <TableCell>{standing.won}</TableCell>
                        <TableCell>{standing.lost}</TableCell>
                        <TableCell>
                          {standing.winPercentage.toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="groupB">
            <Card>
              <CardHeader>
                <p className="text-lg font-semibold">Group B Standings</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team</TableHead>
                      <TableHead>Played</TableHead>
                      <TableHead>Won</TableHead>
                      <TableHead>Lost</TableHead>
                      <TableHead>Win %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupBStandings.map((standing) => (
                      <TableRow key={standing.team}>
                        <TableCell>{standing.team}</TableCell>
                        <TableCell>{standing.played}</TableCell>
                        <TableCell>{standing.won}</TableCell>
                        <TableCell>{standing.lost}</TableCell>
                        <TableCell>
                          {standing.winPercentage.toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
