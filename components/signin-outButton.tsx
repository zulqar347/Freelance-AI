"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export function SignInOut() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Link href="/auth">
        <Button>Sign In</Button>
      </Link>
    );
  }

  return <Button onClick={() => signOut()}>Sign Out</Button>;
}
