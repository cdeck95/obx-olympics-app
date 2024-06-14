"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ui/ModeToggle";
import ScheduleDisplay from "../components/ScheduleDisplay";
import TeamSelector from "../components/TeamSelector";
import { scheduleA } from "../data/schedule";
import { scheduleB } from "../data/schedule";
import TeamMatches from "../components/TeamMatches";
import { Match } from "../interfaces/Match";

export default function Schedule() {
  const teams = [
    "Mexico",
    "Germany",
    "Italy",
    "Greece",
    "Ireland",
    "USA",
    "Canada",
    "France",
    "Australia",
  ];

  const [selectedTeam, setSelectedTeam] = useState<string>(teams[0]);
  const handleSelectTeam = (team: string): void => {
    setSelectedTeam(team);
  };

  const rounds = [...scheduleA, ...scheduleB];

  // // Extract all matches from rounds
  // const combinedSchedule: Match[] = rounds.flatMap((round) => round.matches);

  // // Now combinedSchedule contains all matches from all rounds
  // console.log(combinedSchedule);

  return (
    <main className="flex flex-col min-h-screen w-full items-start justify-start p-8 gap-4">
      <div className="grid grid-cols-1 w-full gap-4">
        <div className="flex flex-row w-full items-center gap-4">
          <h1 className="text-2xl font-bold">Team Schedules</h1>
          <TeamSelector
            teams={teams}
            selectedTeam={selectedTeam}
            onSelect={setSelectedTeam}
          />{" "}
        </div>
        <TeamMatches rounds={rounds} selectedTeam={selectedTeam} />
      </div>
    </main>
  );
}
