import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import React from "react";

const LiveLabel = () => {
  return (
    <div className="flex flex-row justify-around gap-2 items-center">
      <Clock className="h-4 w-4 text-grey-500" />
      <Label className="text-xs text-grey-500">Not Started</Label>
    </div>
  );
};

export default LiveLabel;
