import { Label } from "@/components/ui/label";
import { Radio } from "lucide-react";
import React from "react";

const LiveLabel = () => {
  return (
    <div className="flex flex-row justify-around gap-2 items-center">
      <Radio className="h-4 w-4 text-red-500" />
      <Label className="text-xs text-red-500">Live</Label>
    </div>
  );
};

export default LiveLabel;
