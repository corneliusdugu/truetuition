"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../api/api";

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login"); // replace prevents back-button weirdness
      setAuthed(false);
      setChecked(true);
      return;
    }

    setAuthed(true);
    setChecked(true);
  }, [router]);

  // ✅ Don’t render protected UI until we know auth state
  if (!checked) return null;

  // ✅ If not authed, we already redirected
  if (!authed) return null;

  return children;
}