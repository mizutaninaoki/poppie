import { FC } from "react";

export const PageLoading: FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin h-10 w-10 border-4 border-green-600 rounded-full border-t-transparent"></div>
    </div>
  );
};
