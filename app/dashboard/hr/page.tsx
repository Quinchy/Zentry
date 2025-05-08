"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { signOut } from "@/features/auth/actions/authenticate";
import { getUser } from "@/features/auth/actions/getUser";

type UserData = Awaited<ReturnType<typeof getUser>>;

export default function HrDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      if ("error" in data) {
        setError(data.error);
      } else {
        setUserData(data); // data is { user: User | null }
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return <div>Loading user…</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData || !("user" in userData) || !userData.user)
    return <div>No user found.</div>;

  return (
    <div>
      <h1>HR Dashboard</h1>
      <Button onClick={signOut}>Log Out</Button>

      <h2>User Info</h2>
      {/* Option A: display individual fields */}
      <p>
        <strong>ID:</strong> {userData.user.id}
      </p>
      <p>
        <strong>Email:</strong> {userData.user.email}
      </p>
      <p>
        <strong>Role:</strong> {userData.user.user_metadata?.role || "N/A"}
      </p>
      {/* …add whatever fields you need… */}

      <h3>Raw response</h3>
      {/* Option B: dump everything */}
      <pre style={{ background: "#f0f0f0", padding: "1rem" }}>
        {JSON.stringify(userData, null, 2)}
      </pre>
    </div>
  );
}
