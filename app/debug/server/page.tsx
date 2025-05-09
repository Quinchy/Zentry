"use server";

import { isAuthenticated } from "@/lib/auth/server";

export default async function Debug() {
  const test = await isAuthenticated();
  return (
    <div className="flex flex-col gap-1">
      {test ? (
        "User authenticated"
      ) : (
        "User not authenticated"
      )}
    </div>
  );
}