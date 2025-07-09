import { useEffect, useState } from "react";
import api from "@/lib/axios";
import type { Assignment } from "@/interfaces/assignment";

export function useAssignmentDetails(assignmentId: number | null) {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!assignmentId) return;
    setLoading(true);
    api
      .get(`/assignments/${assignmentId}`)
      .then((res) => setAssignment(res.data.content))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [assignmentId]);

  return { assignment, loading };
}
