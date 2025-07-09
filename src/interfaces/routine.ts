export interface Routine {
  routine_id: number;
  classroom_id: number;
  paper_code: string;
  teacher_id: number;
  day_of_week: number; // 0 = Sunday, 6 = Saturday
  start_time: string; // e.g., "10:00:00"
  end_time: string; // e.g., "11:00:00"
  notes?: string | null;
  created_at: string; // ISO date-time string
  updated_at: string; // ISO date-time string
}
