import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

export function useTeachers(teacherIds: number[]) {
  const [teachers, setTeachers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data: Record<number, string> = {};
        await Promise.all(
          teacherIds.map(async (id) => {
            const res = await api.get(`/users/${id}`);
            const t = res.data?.content;
            data[id] = `${t.first_name}${
              t.middle_name ? " " + t.middle_name : ""
            } ${t.last_name}`;
          })
        );
        setTeachers(data);
      } catch {
        toast.error("Failed to load teacher names");
      } finally {
        setLoading(false);
      }
    };

    if (teacherIds.length > 0) fetchTeachers();
    else setLoading(false);
  }, [teacherIds]);

  return { teachers, loading };
}
