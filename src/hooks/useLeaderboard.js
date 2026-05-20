import { supabase } from "../lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchScores = async () => {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .eq("is_finalized", true)
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

  const submitScore = async (name, gameId) => {
    const { data, error } = await supabase
      .from("leaderboard")
      .update({ name, is_finalized: true })
      .eq("game_id", gameId)
      .eq("is_finalized", false)
      .select();
    if (error) return { error };
    if (data.length === 0) return { error: { message: "already_submitted" } };
    queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    return { error: null };
  };

  return { data, isLoading, error, submitScore };
};

export default useLeaderboard;
