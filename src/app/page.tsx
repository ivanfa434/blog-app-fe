"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  return (
    <div>
      <h1>HomePage</h1>
      {user ? <p>{user.name}</p> : <div>Please Login First !</div>}
      {user ? (
        <Button onClick={clearAuth}>Logout</Button>
      ) : (
        <Button onClick={() => router.push("/login")}>Login</Button>
      )}
    </div>
  );
}
