import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const useWaitlistStats = () => {
  const limit = toNumber(import.meta.env.VITE_WAITLIST_LIMIT, 1000);
  const [state, setState] = useState({
    count: 0,
    remaining: limit,
    loading: true
  });

  useEffect(() => {
    let mounted = true;

    const fetchCount = async () => {
      if (!supabase) {
        if (mounted) {
          setState({
            count: 153,
            remaining: limit - 153,
            loading: false
          });
        }
        return;
      }

      const { count } = await supabase
        .from("waitlist")
        .select("id", { count: "exact", head: true });

      if (mounted) {
        const safeCount = count ?? 0;
        setState({
          count: safeCount,
          remaining: Math.max(0, limit - safeCount),
          loading: false
        });
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [limit]);

  return { ...state, limit };
};
