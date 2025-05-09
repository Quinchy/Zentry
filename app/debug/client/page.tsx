"use client";

import {
  useGetCurrentUserName,
  useIsAuthenticated,
  useGetCurrentUserAvatar,
  useGetCurrentUserId,
  useGetUserEmail,
} from "@/lib/auth/client";
import Image from "next/image";

export default function ClientPageDebug() {
  const isAuthenticated = useIsAuthenticated();
  const fullName = useGetCurrentUserName();
  const avatarUrl = useGetCurrentUserAvatar();
  const userId = useGetCurrentUserId();
  const email = useGetUserEmail();
  return (
    <div className="flex flex-col gap-1">
      {isAuthenticated ? "User authenticated" : "User not authenticated"}
      <br />
      {fullName ? <p>Welcome back, {fullName}!</p> : <p>Please sign in.</p>}
      <br />
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="User avatar"
          quality={100}
          width={100}
          height={100}
        />
      ) : (
        <p>No avatar found.</p>
      )}
      <br />
      {userId ? <p>User ID: {userId}</p> : <p>No user ID found.</p>}
      <br />
      {email ? <p>User email: {email}</p> : <p>No email found.</p>}
    </div>
  );
}
