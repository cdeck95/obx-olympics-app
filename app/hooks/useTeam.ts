import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useTeam = () => {
  const [team, setTeam] = useState<string | null>(null);

  useEffect(() => {
    const savedTeam = Cookies.get("userTeam");
    if (savedTeam) {
      setTeam(savedTeam);
      console.log("Saved team:", savedTeam);
    }
  }, []);

  return { team, setTeam };
};

export default useTeam;
