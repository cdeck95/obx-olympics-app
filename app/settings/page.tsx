"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import useTeam from "../hooks/useTeam";
import useTeams from "../hooks/useTeams";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";

export default function Settings() {
  const { team, setTeam } = useTeam();
  const teams = [
    "Australia",
    "Canada",
    "France",
    "Germany",
    "Greece",
    "Ireland",
    "Italy",
    "Mexico",
    "USA",
  ];

  const [selectedTeam, setSelectedTeam] = useState<string>(team || "");

  const handleSave = () => {
    console.log("Saving...");
    console.log("Selected team:", selectedTeam);
    if (selectedTeam) {
      console.log("Setting team...");
      setTeam(selectedTeam); // Set the team
      console.log("Setting cookie...");
      Cookies.set("userTeam", selectedTeam, { expires: 7 }); // Save team with 7 days expiration
      console.log("Team saved");
      toast({
        title: "Team saved",
        description: `You've selected ${selectedTeam}`,
        variant: "default",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    if (team) {
      setSelectedTeam(team);
    }
  }, [team]);

  return (
    <div className="grid grid-cols-1 w-full items-start justify-start gap-4">
      <div className="flex">
        <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
      </div>
      <Card className="mr-4">
        <CardHeader>
          <CardTitle>Team</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedTeam}
            onValueChange={(e) => setSelectedTeam(e)}
          >
            <SelectTrigger className="w-full max-w-[600px]">
              <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Teams</SelectLabel>

                {teams.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={handleSave}>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
