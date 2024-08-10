import React from "react";

const Counter = ({
  onRemove,
  onAdd,
  count,
  className,
  unavailable,
}: {
  onRemove: () => void;
  onAdd: () => void;
  count: number;
  className?: string;
  unavailable?: boolean;
}) => {
  return (
    <div className={"flex items-center justify-center " + className}>
      {unavailable ? (
        <div className="w-full bg-gray-700 text-white bg-opacity-70">
          Unavailable
        </div>
      ) : (
        <>
          <button
            className="bg-[#FF9633] text-white rounded-md p-1 shadow-custom"
            onClick={onRemove}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H4"
              ></path>
            </svg>
          </button>
          <span className="text-black px-4 py-2 text-md">{count}</span>
          <button
            className="bg-[#FF9633] text-white rounded-md p-1 shadow-custom"
            onClick={onAdd}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v12m0-6h6m-6 0H6"
              ></path>
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default Counter;
