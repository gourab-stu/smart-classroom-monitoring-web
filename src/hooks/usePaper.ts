import { useEffect, useState } from "react";
import api from "@/lib/axios";

export function usePaper(paperCode: string | null) {
  const [paper, setPaper] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!paperCode) return;
    setLoading(true);
    api
      .get(`/papers/${paperCode}`)
      .then((res) => setPaper(res.data.content))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [paperCode]);

  return { paper, loading };
}
