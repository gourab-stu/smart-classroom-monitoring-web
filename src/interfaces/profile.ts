export interface Profile {
  // common
  user_id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  mobile_no: string;
  role: string;
  // student specific
  semester: number;
  elective_papers: Array<string> | null;
  papers: Array<string> | null;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
}
