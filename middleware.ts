import { NextResponse } from "next/server";

// Middleware desativado temporariamente para evitar erros em produção.
// A lógica de redirecionamento já está coberta em `app/page.ts` e na tela de login.
export function middleware(): NextResponse {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
