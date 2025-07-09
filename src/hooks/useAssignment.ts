import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import type { Assignment } from "@/interfaces/assignment";

export function useAssignments() {
  const [assignments, setAssignments] = useState<Array<Assignment | null>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/assignments")
      .then((res) => setAssignments(res.data.content))
      .catch(() => toast.error("Failed to load assignments"))
      .finally(() => setLoading(false));
  }, []);

  return { assignments, loading };
}
