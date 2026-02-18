import type { ReactNode } from "react";
import TopNav from "@/components/dashboard/TopNav";

export default function PontoLayout({
  children,
}: Readonly<{ children: ReactNode }>): React.ReactElement {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(107deg, #BDBDBD 1.08%, #FFF 22.96%, #FFF 72.42%, #D7D7D7 100%)",
      }}
    >
      <TopNav />
      <div className="p-8">{children}</div>
    </div>
  );
}
