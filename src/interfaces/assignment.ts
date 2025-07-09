export interface Assignment {
  assignment_id: number;
  title: string;
  description: string | null;
  paper_code: string;
  teacher_id: number;
  assignment_type: string;
  due_date: string | null;
  assigned_date: string;
  instructions: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
