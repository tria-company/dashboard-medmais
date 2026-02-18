import FiltroPostoEmpresa from "@/components/filtro-posto-empresa";

export default function DashboardContent(): React.ReactElement {
  return (
    <main className="min-h-screen p-6">
      <div className="mb-6">
        <FiltroPostoEmpresa />
      </div>
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
    </main>
  );
}
