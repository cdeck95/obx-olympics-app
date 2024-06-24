"use client";

import { useState, useEffect } from "react";
import { useSchedules } from "../hooks/useSchedules";
import useStations, { Station } from "../hooks/useStations";
import { Match } from "../interfaces/Match";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, X } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Description } from "@radix-ui/react-toast";
import { toast } from "@/components/ui/use-toast";
import { Round } from "../interfaces/Round";
import { createBracketData } from "../data/bracket";
import { TeamStanding } from "../interfaces/TeamStanding";
import useTeam from "../hooks/useTeam";
import useTeams from "../hooks/useTeams";
import { calculateStandings } from "../utils/calculateStandings";
import { Game } from "@g-loot/react-tournament-brackets";
import Cookies from "js-cookie";

const AdminPage: React.FC = () => {
  const {
    scheduleRounds,
    scheduleMatches,
    groupStageActive,
    groupStageOver,
    bracketPlayLive,
    loading,
    error,
    loadSchedules,
  } = useSchedules();
  console.log("Schedule Rounds:", scheduleRounds);
  const stationsData = useStations();
  const [matches, setMatches] = useState<Match[]>([]);
  const [bracketMatches, setBracketMatches] = useState<Game[]>([]);
  const [bracketLive, setBracketLive] = useState<boolean>(false);
  const [unsavedChanges, setUnsavedChanges] = useState<Set<number>>(new Set());
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const teamsData = useTeams();
  const [teams, setTeams] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const authCookie = Cookies.get("admin-auth");
    if (authCookie) {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = () => {
    const correctPassword = "obx2024admin"; // Replace with your actual password
    if (password === correctPassword) {
      Cookies.set("admin-auth", "true", { expires: 3 }); // Set cookie for 72 hours
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Error",
        description: "Incorrect password",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    if (teamsData) {
      setTeams(teamsData.teams);
    }
  }, [teamsData]);

  useEffect(() => {
    if (scheduleRounds) {
      try {
        const teamsList = teams.map((team) => team.name); // Extract team names from the teams data
        const matches = scheduleRounds.flatMap((round: any) => round.matches);
        const standings = calculateStandings(teamsList, matches);
        console.log("Standings", standings);
        setStandings(standings);
      } catch (error) {
        console.error("Failed to calculate standings", error);
      }
    }
  }, [scheduleRounds, teams]);

  const columns: ColumnDef<Match>[] = [
    {
      accessorKey: "roundNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rd #" />
      ),
      cell: ({ row }) => row.original.roundNumber,
      // filterFn: (row, id, value) => {
      //   console.log("Filtering:", {
      //     rowValue: row.getValue(id),
      //     filterValue: value,
      //   });
      //   return value.includes(row.getValue(id));
      // },
    },
    {
      accessorKey: "team1",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Team 1" />
      ),
      cell: ({ row }) => row.original.team1,
    },
    {
      accessorKey: "scoreTeam1",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Score 1" />
      ),
      cell: ({ row }) => {
        return (
          <Input
            type="number"
            value={row.original.scoreTeam1 ?? ""}
            placeholder="Score"
            onChange={(e) => {
              const newScore = Number(e.target.value);
              handleScoreChange(row.original.id, "Team1", newScore);
            }}
            className="w-full"
          />
        );
      },
    },
    {
      accessorKey: "team2",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Team 2" />
      ),
      cell: ({ row }) => row.original.team2,
    },
    {
      accessorKey: "scoreTeam2",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Score 2" />
      ),
      cell: ({ row }) => {
        const score = row.original.scoreTeam2;
        return (
          <Input
            type="number"
            value={score ?? ""}
            placeholder="Score"
            onChange={(e) => {
              const newScore = Number(e.target.value);
              handleScoreChange(row.original.id, "Team2", newScore);
            }}
            className="w-full"
          />
        );
      },
    },
    {
      accessorKey: "status",
      filterFn: (row, id, value) => {
        console.log("Filtering:", {
          rowValue: row.getValue(id),
          filterValue: value,
        });
        return value.includes(row.getValue(id));
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Select
            value={status}
            onValueChange={(e) => {
              const newStatus = e;
              setMatches((prevMatches) =>
                prevMatches.map((match) =>
                  match.id === row.original.id
                    ? { ...match, status: newStatus }
                    : match
                )
              );
              setUnsavedChanges((prev) => {
                const newSet = new Set(prev);
                newSet.add(row.original.id);
                return newSet;
              });
            }}
          >
            <SelectTrigger className="min-w-[130px]">
              <SelectValue placeholder="Select a Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status Options</SelectLabel>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Live">Live</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "station",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Station" />
      ),
      cell: ({ row }) => {
        const stationId = row.original.station?.id.toString();
        return (
          <Select
            value={stationId}
            onValueChange={(e) => {
              const newStation = stationsData.stationsData!.stations.find(
                (station) => station.id === Number(e)
              );
              if (newStation) {
                console.log("New Station:", newStation);
                setMatches((prevMatches) =>
                  prevMatches.map((match) =>
                    match.id === row.original.id
                      ? {
                          ...match,
                          station: newStation,
                        }
                      : match
                  )
                );
                setUnsavedChanges((prev) => {
                  const newSet = new Set(prev);
                  newSet.add(row.original.id);
                  return newSet;
                });
              }
            }}
          >
            <SelectTrigger className="min-w-[130px]">
              <SelectValue placeholder="Select a Station" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Stations</SelectLabel>
                {stationsData.stationsData?.stations.map((station: Station) => (
                  <SelectItem key={station.id} value={station.id.toString()}>
                    {station.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const match = row.original;
        const hasUnsavedChanges = unsavedChanges.has(match.id);

        return (
          hasUnsavedChanges && (
            <Button onClick={() => handleSaveMatch(match)}>Save</Button>
          )
        );
      },
    },
  ];

  const handleStartBracketPlay = async () => {
    const newBracketMatches = createBracketData(standings);
    setBracketMatches(newBracketMatches);
    setBracketLive(true);
    try {
      const response = await fetch("/api/saveBracketStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bracketMatches: newBracketMatches,
          bracketPlayLive: true,
          bracketPlayOver: false,
        }),
      });

      if (!response.ok) {
        toast({
          title: "Error",
          description: "Failed to start bracket play",
          variant: "destructive",
          duration: 3000,
        });
        throw new Error("Failed to start bracket play");
      }

      toast({
        title: "Success",
        description: "Bracket play started successfully",
        variant: "default",
        duration: 3000,
      });
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        title: "Error",
        description: "Failed to start bracket play",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleScoreChange = (
    matchId: number,
    team: "Team1" | "Team2",
    score: number
  ) => {
    setMatches((prevMatches) =>
      prevMatches.map((match) => {
        if (match.id === matchId) {
          const updatedMatch = {
            ...match,
            status: "Completed",
          };

          if (team === "Team1") {
            updatedMatch.scoreTeam1 = score;
            updatedMatch.scoreTeam2 = score === 1 ? 0 : 1;
            updatedMatch.isWinnerTeam1 = score === 1;
            updatedMatch.isWinnerTeam2 = score === 0;
          } else {
            updatedMatch.scoreTeam2 = score;
            updatedMatch.scoreTeam1 = score === 1 ? 0 : 1;
            updatedMatch.isWinnerTeam1 = score === 0;
            updatedMatch.isWinnerTeam2 = score === 1;
          }

          return updatedMatch;
        }
        return match;
      })
    );
    setUnsavedChanges((prev) => {
      const newSet = new Set(prev);
      newSet.add(matchId);
      return newSet;
    });
  };

  const handleSaveMatch = async (match: Match) => {
    try {
      const response = await fetch("/api/saveSchedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schedule: matches,
          // schedule: matches.map((match) => ({
          //   ...match,
          //   station: match.station!.id, // Ensure station is an ID, not the full object
          // })),
          groupStageActive: groupStageActive,
          groupStageOver: groupStageOver,
        }),
      });

      if (!response.ok) {
        console.log("Failed to save schedules");
        console.log("Response:", response);
        throw new Error("Failed to save schedules");
      }

      setUnsavedChanges(new Set()); // Clear unsaved changes after successful save
      toast({
        title: "Success",
        description: "Match saved successfully",
        variant: "default",
        duration: 3000,
      });

      setTimeout(() => {
        loadSchedules();
      }, 1000); // 1000 milliseconds = 1 second
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        title: "Error",
        description: "Failed to save match",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    if (scheduleMatches) {
      // Assuming schedule is an array of matches directly
      const allMatches = scheduleMatches
        .map((match) => ({
          ...match,
          roundNumber: match.roundNumber,
        }))
        .filter((match) => match.team1 !== "BYE" && match.team2 !== "BYE");

      setMatches(allMatches);
      const hasLiveOrCompletedMatches = allMatches.some(
        (match) => match.status === "Live" || match.status === "Completed"
      );

      console.log("Has live or completed matches:", hasLiveOrCompletedMatches);

      if (hasLiveOrCompletedMatches && !groupStageOver && !groupStageActive) {
        console.log("Group stage is in progress");
        handleStartGroupStage();
      }

      if (groupStageOver) {
        console.log("Group stage is over");
      }
    }
  }, [scheduleMatches, groupStageOver, groupStageActive]);

  // const [currentGroupStageActive, setCurrentGroupStageActive] =
  //   useState<boolean>(groupStageActive);

  // useEffect(() => {
  //   setCurrentGroupStageActive(groupStageActive);
  // }, [groupStageActive]);

  const handleStartGroupStage = async () => {
    try {
      const response = await fetch("/api/saveGroupStageStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupStageActive: true,
        }),
      });

      if (!response.ok) {
        toast({
          title: "Error",
          description: "Failed to start group stage",
          variant: "destructive",
          duration: 3000,
        });
        throw new Error("Failed to start group stage");
      }

      // setCurrentGroupStageActive(true);
      toast({
        title: "Success",
        description: "Group stage started successfully",
        variant: "default",
        duration: 3000,
      });
      loadSchedules(); // Re-fetch the schedule after starting the group stage
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        title: "Error",
        description: "Failed to start group stage",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleEndGroupStage = async () => {
    try {
      const response = await fetch("/api/saveGroupStageStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupStageActive: false,
          groupStageOver: true,
        }),
      });

      if (!response.ok) {
        toast({
          title: "Error",
          description: "Failed to end group stage",
          variant: "destructive",
          duration: 3000,
        });
        throw new Error("Failed to end group stage");
      }

      // setCurrentGroupStageActive(false);
      toast({
        title: "Success",
        description: "Group stage ended successfully",
        variant: "default",
        duration: 3000,
      });
      loadSchedules(); // Re-fetch the schedule after starting the group stage
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        title: "Error",
        description: "Failed to end group stage",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    if (bracketPlayLive) {
      setBracketLive(true);
    }
  }, [bracketPlayLive]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const allMatches = [...matches, ...bracketMatches].filter(
  //   (match) => match.team1 && match.team2
  // );

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="mb-4">Enter Admin Password</h2>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4"
        />
        <Button onClick={handlePasswordSubmit}>Submit</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 w-full gap-4">
      <h1 className="text-xl mb-4">Admin Page</h1>
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        {!groupStageActive && !groupStageOver && (
          <Button onClick={handleStartGroupStage} disabled={groupStageActive}>
            {groupStageActive ? "Group Stage Active" : "Start Group Stage"}
          </Button>
        )}
        {groupStageActive && !groupStageOver && (
          <Button onClick={handleEndGroupStage} disabled={!groupStageActive}>
            {groupStageActive ? "End Group Stage" : "Group Stage Ended"}
          </Button>
        )}
        {groupStageOver && (
          <Button onClick={handleStartBracketPlay} disabled={bracketLive}>
            {bracketLive ? "Bracket Play Active" : "Start Bracket Play"}
          </Button>
        )}
      </div>
      <DataTable columns={columns} data={matches} />
    </div>
  );
};

export default AdminPage;
