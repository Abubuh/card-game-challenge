import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const useLeaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchScores = async () => {
    const { data, error } = await supabase
      .from("leaderboard")
      .select("*")
      .order("time", { ascending: false })
      .limit(10);

    if (!error) setScores(data);
    setLoading(false);
  };

  const submitScore = async (name, time) => {
    const { error } = await supabase.from("leaderboard").insert({ name, time });

    if (!error) fetchScores();
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return { scores, loading, submitScore };
};

export default useLeaderboard;
