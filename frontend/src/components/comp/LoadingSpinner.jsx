function LoadingSpinner() {
  return (
    <div className="bg-fondo-spinner fixed inset-0 z-50 flex h-full w-full items-center justify-center">
      <div className="loader h-12 w-12 rounded-full border-4 border-t-4 border-gray-300 border-l-blue-600 ease-linear"></div>
    </div>
  );
}

export default LoadingSpinner;
