import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#141414]">
      <h1 className="mb-4 flex flex-col items-center text-4xl font-bold">
        <span className="text-7xl">404</span>
        Página no encontrada
      </h1>
      <p className="mb-4">La página que estás buscando no existe.</p>
      <Link to="/login" className="text-blue-500 underline">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFoundPage;
