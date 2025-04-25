"use client";

import { Button } from "@/components/ui/button";
import HomePage from "@/features/home";
import { useAuthStore } from "@/stores/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  return <HomePage />;
}
