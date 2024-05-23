import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[#141414]">
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <p className="mb-4">La página que estás buscando no existe.</p>
      <Link to="/login" className="text-blue-500 underline">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFoundPage;
