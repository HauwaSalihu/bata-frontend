import React from "react";
import { useSelector } from "react-redux";
import { selectLoading } from "../slicers/loadingSlice";

const LoaderProvider = ({ children }) => {
  const loading = useSelector(selectLoading);
  const isLoading = useSelector((state) => state.user.isLoading);

  return (
    <>
      {/* Render children */}
      {children}

      {/* Overlay and spinner */}
      {(loading || isLoading) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center justify-center">
            {/* Tailwind spinner */}
            <div className="animate-spin h-12 w-12 border-4 border-red-500 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-white font-medium">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoaderProvider;
