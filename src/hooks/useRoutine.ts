import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Routine } from "@/interfaces/routine";

export const useRoutines = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const res = await axios.get("/routines/");
        const data = res.data.content;

        // ✅ Ensure it's an array
        if (Array.isArray(data)) {
          setRoutines(data);
        } else {
          console.error("Expected array but got:", data);
          setRoutines([]); // fallback
        }
      } catch (err) {
        console.error("Error fetching routines:", err);
        setRoutines([]); // fallback on error
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, []);

  return { routines, loading };
};
