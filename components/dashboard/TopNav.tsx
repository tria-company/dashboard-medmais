"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Executivo", href: "/executivo" },
  { label: "Ponto", href: "/ponto" },
  { label: "Férias", href: "/ferias" },
  { label: "Turnover", href: "/turnover" },
  { label: "Compliance", href: "/compliance" },
  { label: "Custos", href: "/custos" },
  { label: "Treinamento", href: "/treinamento" },
];

export default function TopNav(): React.ReactElement {
  const pathname = usePathname();
  return (
    <div className="px-6 pt-6">
      <header
        className="flex min-h-[72px] w-full items-center rounded-full bg-white px-8 py-0 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
        role="banner"
      >
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 justify-start">
            <Link href="/executivo" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="med+ Group"
                width={140}
                height={48}
                priority
                className="h-auto w-auto"
              />
            </Link>
          </div>
          <nav
            className="flex shrink-0 items-center justify-center gap-1"
            role="tablist"
          >
            {TABS.map((tab) => {
              const active = pathname === tab.href;
              return (
                <Link
                  key={tab.label}
                  href={tab.href}
                  role="tab"
                  className={`rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 ${
                    active
                      ? "font-semibold text-[#2c3545] underline decoration-2 decoration-orange-400 underline-offset-4"
                      : ""
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex min-w-0 flex-1" aria-hidden />
        </div>
      </header>
    </div>
  );
}
