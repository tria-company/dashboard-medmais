import type { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>): React.ReactElement {
  return <>{children}</>;
}
