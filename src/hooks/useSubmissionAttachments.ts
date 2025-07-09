import { useEffect, useState } from "react";
import api from "@/lib/axios";

export function useSubmissionAttachments(assignmentId: number | null) {
  const [attachments, setAttachments] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!assignmentId) return;
    setLoading(true);

    (async () => {
      try {
        const submissions = await api.get(
          `/assignments/${assignmentId}/submissions/`
        );
        if (!submissions.data.content || !submissions.data.content.length)
          return;

        const attachmentsData = await Promise.all(
          submissions.data.content.map(async (submission: any) => {
            const res = await api.get(
              `/submissions/${submission.submission_id}/attachments`
            );
            return {
              submissionId: submission.submission_id,
              attachments: res.data.content,
            };
          })
        );

        setAttachments(attachmentsData);
      } catch {
        setAttachments([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [assignmentId]);

  return { attachments, loading };
}
