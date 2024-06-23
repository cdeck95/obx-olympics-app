"use client";

import { useState, useEffect } from "react";
import { Game } from "@g-loot/react-tournament-brackets";
import { useSchedules } from "../hooks/useSchedules";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import { DataTableColumnHeader } from "../admin/data-table-column-header";
import useTeams from "../hooks/useTeams";
import { saveDataUtil } from "../utils/dataUtils";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";

const BracketAdmin: React.FC = () => {
  const {
    bracketMatches,
    bracketPlayLive,
    bracketPlayOver,
    loading,
    error,
    loadSchedules,
  } = useSchedules();
  const [bracketData, setBracketData] = useState<Game[]>([]);
  const [unsavedChanges, setUnsavedChanges] = useState<Set<string>>(new Set());
  const [bracketLive, setBracketLive] = useState<boolean>(false);
  const teams = useTeams()?.teams;

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
    if (bracketMatches) {
      setBracketData(bracketMatches);
    }
  }, [bracketMatches]);

  const handleWinnerChange = async (matchId: string, winnerId: string) => {
    console.log("handleWinnerChange", matchId, winnerId);

    let updatedBracketData = bracketData.map((match) => {
      if (match.id === matchId) {
        const updatedParticipants = match.participants.map((participant) => ({
          ...participant,
          isWinner: participant.id === winnerId,
          resultText: participant.id === winnerId ? "W" : "L",
        }));
        return {
          ...match,
          state: "DONE",
          participants: updatedParticipants,
        };
      }
      return match;
    });

    const currentMatch = updatedBracketData.find(
      (match) => match.id === matchId
    );
    const winner = currentMatch?.participants.find((p) => p.id === winnerId);

    if (currentMatch?.nextMatchId && winner) {
      updatedBracketData = updatedBracketData.map((match) => {
        if (match.id === currentMatch.nextMatchId) {
          const updatedNextMatchParticipants = match.participants.map(
            (participant) =>
              participant.id === matchId
                ? {
                    ...participant,
                    id: winner.id,
                    name: winner.name,
                    isWinner: false,
                    status: null,
                    resultText: "",
                  }
                : participant
          );
          return {
            ...match,
            participants: updatedNextMatchParticipants,
          };
        }
        return match;
      });
    }

    console.log("bracket data updated", updatedBracketData);

    setBracketData(updatedBracketData);

    try {
      console.log("saving data");
      await saveDataUtil({
        bracketMatches: updatedBracketData,
        bracketPlayLive: true,
      });
      console.log("data saved");
      toast({
        title: "Success",
        description: "Bracket data updated successfully",
        variant: "default",
        duration: 3000,
      });
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        title: "Error",
        description: "Failed to update bracket data",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleStateChange = async (matchId: string, newState: string) => {
    setBracketData((prevBracketData) => {
      const updatedBracketData = prevBracketData.map((match) => {
        if (match.id === matchId) {
          return {
            ...match,
            state: newState,
          };
        }
        return match;
      });

      saveDataUtil({
        bracketMatches: updatedBracketData,
      }); // Save the data immediately
      return updatedBracketData;
    });
  };

  const columns: ColumnDef<Game>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Match Name" />
      ),
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "participants",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Participants" />
      ),
      cell: ({ row }) =>
        row.original.participants.map((p) => p.name).join(" vs "),
    },
    {
      accessorKey: "startTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Station" />
      ),
      cell: ({ row }) => row.original.startTime,
    },
    {
      accessorKey: "state",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="State" />
      ),
      cell: ({ row }) => {
        const match = row.original;
        return (
          <Select
            value={match.state}
            onValueChange={(e) => handleStateChange(match.id, e)}
          >
            <SelectTrigger className="min-w-[130px]">
              <SelectValue placeholder="Select a State" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>State Options</SelectLabel>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Live">Live</SelectItem>
                <SelectItem value="DONE">Done</SelectItem>
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

        const participantsDetermined =
          match.participants[0].name !== "Winner of Play-in" &&
          match.participants[1].name !== "Winner of Play-in";

        return (
          <div className="grid grid-cols-1 min-w-[170px]">
            {participantsDetermined && (
              <div className="grid grid-cols-1 gap-4">
                <Button
                  variant={
                    match.participants[0].isWinner ? "default" : "outline"
                  }
                  className={
                    match.participants[0].isWinner
                      ? "bg-green-500 text-white"
                      : ""
                  }
                  onClick={() =>
                    handleWinnerChange(match.id, match.participants[0].id)
                  }
                >
                  {match.participants[0].name}{" "}
                  {match.state !== "DONE"
                    ? "Wins"
                    : match.participants[0].isWinner
                    ? "Won"
                    : "Lost"}
                </Button>
                <Button
                  variant={
                    match.participants[1].isWinner ? "default" : "outline"
                  }
                  className={
                    match.participants[1].isWinner
                      ? "bg-green-500 text-white"
                      : ""
                  }
                  onClick={() =>
                    handleWinnerChange(match.id, match.participants[1].id)
                  }
                >
                  {match.participants[1].name}{" "}
                  {match.state !== "DONE"
                    ? "Wins"
                    : match.participants[1].isWinner
                    ? "Won"
                    : "Lost"}
                </Button>
              </div>
            )}
            {/* {hasUnsavedChanges && (
              <Button onClick={() => handleSaveBracket()}>Save</Button>
            )} */}
          </div>
        );
      },
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!teams) {
    return <div>No teams found</div>;
  }

  const readyMatches = bracketData.filter(
    (match) =>
      teams.some((team) => team.name === match.participants[0].id) &&
      teams.some((team) => team.name === match.participants[1].id)
  );

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
      <h1 className="text-xl mb-4">Bracket Admin Page</h1>
      <DataTable columns={columns} data={readyMatches} />
    </div>
  );
};

export default BracketAdmin;
