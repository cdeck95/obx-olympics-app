import { Label } from "@/components/ui/label";
import { CalendarCheck } from "lucide-react";
import React from "react";

const EndedLabel = () => {
  return (
    <div className="flex flex-row justify-around gap-2 items-center">
      <CalendarCheck className="h-4 w-4 text-grey-500" />
      <Label className="text-xs text-grey-500 mt-[1px]">Ended</Label>
    </div>
  );
};

export default EndedLabel;
