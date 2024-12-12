import React from "react";

const AddStudentButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center h-10 px-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200"
    >
      <span className=" flex items-center justify-center md:hidden  h-8 pb-1 text-2xl">
        +
      </span>

      {/* Text with SVG icon only on larger screens */}
      <span className="hidden md:flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.75v14.5M19.25 12H4.75"
          />
        </svg>
        Add Student
      </span>
    </button>
  );
};

export default AddStudentButton;
