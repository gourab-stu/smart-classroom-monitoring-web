import type { Attachment } from "./attachment";

export interface Submission {
  submission_id: number;
  assignment_id: number;
  student_id: string;
  submitted_at: string;
  attachments: Attachment[];
}
