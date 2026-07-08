"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex gap-3 items-center">
        <p className="text-sm">{session.user?.email}</p>

        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 bg-black text-white rounded"
    >
      Sign in with Google
    </button>
  );
}
