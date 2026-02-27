import TopNav from "@/components/dashboard/TopNav";
import GlobalFiltersBar from "@/components/GlobalFiltersBar";

const PAGE_GRADIENT =
  "linear-gradient(107deg, #BDBDBD 1.08%, #FFF 22.96%, #FFF 72.42%, #D7D7D7 100%)";

export default function FixedDashboardHeader(): React.ReactElement {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-30 pb-6"
      style={{ background: PAGE_GRADIENT }}
      role="banner"
    >
      <TopNav />
      <GlobalFiltersBar />
    </header>
  );
}
