import { useSelector } from "react-redux";

function LoadingSpinner() {
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-[#141414] bg-opacity-60">
      <div className="loader h-12 w-12 rounded-full border-4 border-t-4 border-gray-300 border-l-blue-600 border-t-blue-600 ease-linear"></div>
    </div>
  );
}

export default LoadingSpinner;
