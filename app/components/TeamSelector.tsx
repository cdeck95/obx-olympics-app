import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Team } from "../interfaces/Team";

interface TeamSelectorProps {
  teams: Team[];
  selectedTeam: string;
  onSelect: (selectedTeam: string) => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({
  teams,
  selectedTeam,
  onSelect,
}) => {
  return (
    <Select onValueChange={(e) => onSelect(e)} value={selectedTeam}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {teams.map((team) => (
          <SelectItem key={team.id} value={team.name}>
            {team.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TeamSelector;
