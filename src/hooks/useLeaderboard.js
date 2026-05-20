import { supabase } from "../lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchScores = async () => {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("time_remaining", { ascending: false })
    .limit(10);
  if (error) throw new Error(error.message);
  return data;
};

const useLeaderboard = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchScores,
  });
  const submitScore = async (name, time_remaining, gameId) => {
    const { error } = await supabase
      .from("leaderboard")
      .insert({ name, time_remaining, game_id: gameId });
    if (!error) {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    }
    return { error };
  };

  return { data, isLoading, error, submitScore };
};

export default useLeaderboard;
