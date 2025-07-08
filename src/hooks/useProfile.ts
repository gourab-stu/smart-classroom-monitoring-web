import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import type { Profile } from "@/interfaces/profile";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users/me")
      .then((res) => setProfile(res.data.content))
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading };
}
