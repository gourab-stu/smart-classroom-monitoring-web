import { useEffect, useState } from "react";
import api from "@/lib/axios";
import type { Profile } from "@/interfaces/profile";
import type { Submission } from "@/interfaces/submission"; // you define this shape

export function useStudentProfiles(submissions: Submission[]) {
  const [profiles, setProfiles] = useState<Map<number, Profile>>(new Map());

  useEffect(() => {
    const userIds = Array.from(new Set(submissions.map((s) => s.student_id)));
    const fetchProfiles = async () => {
      try {
        const results = await Promise.all(
          userIds.map((id) =>
            api.get(`/users/${id}`).then((res) => [id, res.data.content])
          )
        );
        setProfiles(new Map(results));
      } catch (error) {
        console.error("Failed to load student profiles", error);
      }
    };

    if (submissions.length > 0) fetchProfiles();
  }, [submissions]);

  return profiles;
}
