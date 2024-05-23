import { useSelector } from "react-redux";

function LoadingSpinner() {
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (!isLoading) return null;

  return (
    <div className=" fixed bg-[#141414] bg-opacity-60 inset-0 z-50 flex justify-center items-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-blue-600 border-l-blue-600 border-gray-300 h-12 w-12"></div>
    </div>
  );
}

export default LoadingSpinner;
