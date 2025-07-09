import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import type { Submission } from "@/interfaces/submission";

export const useAllSubmissions = (assignmentId: number | null) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!assignmentId) return;

    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(
          `/assignments/${assignmentId}/submissions`
        );
        const allSubs = data.content;

        const detailedSubs = await Promise.all(
          allSubs.map(async (sub: any) => {
            const attachmentsRes = await api.get(
              `/submissions/${sub.submission_id}/attachments`
            );
            const studentRes = await api.get(`/users/${sub.student_id}`);
            return {
              submission_id: sub.submission_id,
              student_name:
                studentRes.data.content.first_name +
                  (studentRes.data.content.middle_name
                    ? ` ${studentRes.data.content.middle_name}`
                    : ` `) +
                  studentRes.data.content.last_name || "Unknown",
              submitted_at: sub.submitted_at,
              attachments: attachmentsRes.data.content || [],
            };
          })
        );

        setSubmissions(detailedSubs);
      } catch (error) {
        toast.error("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [assignmentId]);

  return { submissions, loading };
};
