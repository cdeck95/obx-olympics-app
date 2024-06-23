// components/TeamSelectionPopup.tsx
"use client";

import React, { useState, useEffect } from "react";
import useTeam from "../hooks/useTeam";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const TeamSelectionPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { team, setTeam } = useTeam();
  const [selectedTeam, setSelectedTeam] = useState<string>(team || teams[0]);

  useEffect(() => {
    const popupDismissed = Cookies.get("popupDismissed");
    if (!popupDismissed && !team) {
      setShowPopup(true);
    }
  }, [team]);

  const handleSave = () => {
    if (selectedTeam) {
      setTeam(selectedTeam); // Set the team
      Cookies.set("userTeam", selectedTeam, { expires: 30 }); // Save team with 7 days expiration
      window.location.reload(); // Reload the page
    }
    setShowPopup(false); // Close the popup
  };

  const handleDismiss = () => {
    Cookies.set("popupDismissed", "true", { expires: 1 }); // Dismiss for 24 hours
    setShowPopup(false); // Close the popup
  };

  if (!showPopup || team) {
    return null;
  }

  return (
    <Dialog open={true}>
      <DialogContent className="max-w-[300px] lg:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Select Your Team</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 w-full py-4">
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
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleDismiss} variant="outline">
            Dismiss
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamSelectionPopup;
