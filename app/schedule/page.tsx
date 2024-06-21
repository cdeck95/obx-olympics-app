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

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 w-full gap-4">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 w-full gap-4">
          <div className="flex flex-row w-full items-center gap-4">
            <h1 className="text-2xl font-bold">Schedule</h1>
            <TeamSelector
              teams={teams}
              selectedTeam={selectedTeam!}
              onSelect={setSelectedTeam}
            />{" "}
          </div>
          {selectedTeam && (
            <TeamMatches
              rounds={rounds}
              selectedTeam={selectedTeam}
              teams={teams}
            />
          )}
        </div>
      )}
    </>
  );
}
