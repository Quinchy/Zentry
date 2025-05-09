"use client";

import { Button } from "@/components/shadcn/ui/button";
import { signOut } from "@/features/auth/actions/authenticate";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
      <Button onClick={signOut}>Log Out</Button>
    </div>
  );
}
