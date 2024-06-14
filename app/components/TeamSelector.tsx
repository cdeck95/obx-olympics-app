import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamSelectorProps {
  teams: string[];
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
          <SelectItem key={team} value={team}>
            {team}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TeamSelector;
