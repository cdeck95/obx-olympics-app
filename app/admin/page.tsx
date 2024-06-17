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

const AdminPage: React.FC = () => {
  const { schedule, loading, error } = useSchedules();
  const stationsData = useStations();
  const [matches, setMatches] = useState<Match[]>([]);

  const columns: ColumnDef<Match>[] = [
    {
      accessorKey: "roundNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rd #" />
      ),
      cell: ({ row }) => row.original.roundNumber,
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
        const score = row.original.scoreTeam1;
        return (
          <Input
            type="number"
            value={score ?? ""}
            placeholder="Score"
            onChange={(e) => (row.original.scoreTeam1 = Number(e.target.value))}
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
            onChange={(e) => (row.original.scoreTeam2 = Number(e.target.value))}
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
            onValueChange={(e) => (row.original.status = e)} //need to do like a set status method here
          >
            <SelectTrigger className="min-w-[130px]">
              <SelectValue placeholder="Select a Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status Options</SelectLabel>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
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
        const station = row.original.station?.id.toString();
        return (
          <Select
            value={station}
            onValueChange={(e) => (row.original.stationId = Number(e))} //need to do like a set status method here
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

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEditMatch(match)}>
                <div className="flex flex-row gap-2 justify-center items-center">
                  <Pencil className="w-4 h-4" /> Edit Match
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem onClick={() => handleDeleteMatch(match)}>
                <div className="flex flex-row gap-2 justify-center items-center">
                  <X className="w-4 h-4" /> Delete Match
                </div>
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleEditMatch = (match: Match) => {
    // Handle match edit logic here
  };

  const handleDeleteMatch = (match: Match) => {
    // Handle match delete logic here
  };

  useEffect(() => {
    if (schedule) {
      const allMatches = schedule.flatMap((round) => round.matches);
      setMatches(allMatches);
    }
  }, [schedule]);

  const handleScoreChange = (
    matchId: number,
    team: "team1" | "team2",
    score: number
  ) => {
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.id === matchId ? { ...match, [`score${team}`]: score } : match
      )
    );
  };

  const handleStatusChange = (matchId: number, status: string) => {
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.id === matchId ? { ...match, status } : match
      )
    );
  };

  const handleStationChange = (matchId: number, stationId: number) => {
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.id === matchId
          ? {
              ...match,
              stationId,
              station: stationsData.stationsData!.stations.find(
                (station) => station.id === stationId
              ),
            }
          : match
      )
    );
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/saveSchedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schedule: schedule, // Send the unified schedule
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save schedules");
      }

      alert("Schedules saved successfully!");
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Failed to save schedules");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 w-full gap-4">
      <h1 className="text-xl mb-4">Admin Page</h1>
      <DataTable columns={columns} data={matches} />
    </div>
  );
};

export default AdminPage;
