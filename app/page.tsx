"use client";

import { useAuth } from "@/lib/auth-context";
import { LoginForm } from "@/components/auth/login-form";

export default function Home() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <main className="flex flex-1" />;
  }

  if (!token) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <LoginForm />
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center">
      <p className="text-sm text-zinc-500">Dashboard content coming soon.</p>
    </main>
  );
}
