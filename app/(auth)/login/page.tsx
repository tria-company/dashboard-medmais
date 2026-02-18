"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/login-form";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from "@/lib/auth-constants";

const COOKIE_MAX_AGE_DAYS = 7;

function setAuthCookie(): void {
  const maxAgeSeconds = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${AUTH_COOKIE_NAME}=${AUTH_COOKIE_VALUE}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export default function LoginPage(): React.ReactElement {
  const router = useRouter();

  function handleLoginSuccess(): void {
    setAuthCookie();
    router.push("/executivo");
  }

  return <LoginForm onSuccess={handleLoginSuccess} />;
}
