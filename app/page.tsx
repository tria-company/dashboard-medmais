import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/auth-constants";

export default async function RootPage(): Promise<never> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);
  if (token?.value) {
    redirect("/executivo");
  }
  redirect("/login");
}
