import { supabase } from "../lib/supabase";

const useInsertScore = () => {
  const insertInitialScore = async (gameId, time_remaining) => {
    const { error } = await supabase
      .from("leaderboard")
      .insert({ game_id: gameId, time_remaining, is_finalized: false });
    return { error };
  };

  return { insertInitialScore };
};

export default useInsertScore;
