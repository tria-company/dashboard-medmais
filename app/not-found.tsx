import Link from "next/link";

export default function NotFound(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4">
      <h1 className="text-2xl font-bold text-gray-900">Página não encontrada</h1>
      <p className="text-gray-600">A rota solicitada não existe.</p>
      <Link
        href="/"
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Ir para o início
      </Link>
    </div>
  );
}
