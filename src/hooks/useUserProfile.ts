import { useEffect, useState } from "react";
import api from "@/lib/axios";
import type { Profile } from "@/interfaces/profile";

export function useUserProfile(userId: number | null) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    api
      .get(`/users/${userId}`)
      .then((res) => setProfile(res.data.content))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  return { profile, loading };
}
