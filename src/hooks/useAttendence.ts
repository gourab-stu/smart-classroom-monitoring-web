import { useEffect, useState } from "react";

export interface AttendanceRecord {
  date: string;
  subject: string;
  teacher: string;
  time: string;
  status: "Present" | "Absent";
}

export function useAttendance() {
  const [data, setData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const response = await fetch("http://localhost:8000/api/attendance");
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Could not fetch attendance data");
      } finally {
        setLoading(false);
      }
    }

    fetchAttendance();
  }, []);

  return { data, loading, error };
}
