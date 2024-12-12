import React, { useState } from "react";
import { Search as SearchIcon, Filter } from "lucide-react";

// Search Component
const SearchField = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    byName: true,
    byClass: false,
  });

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query, searchOptions);
  };

  const toggleSearchOption = (option) => {
    const updatedOptions = {
      byName: option === "byName",
      byClass: option === "byClass",
    };
    setSearchOptions(updatedOptions);
    setDropdownOpen(false);
    onSearch(searchQuery, updatedOptions);
  };

  return (
    <div className="flex items-center space-x-2  relative">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 pr-12 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="mr-2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      {dropdownOpen && (
        <div className="absolute z-10 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1">
            <button
              onClick={() => toggleSearchOption("byName")}
              className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                searchOptions.byName
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-700"
              }`}
            >
              Search by Name
            </button>
            <button
              onClick={() => toggleSearchOption("byClass")}
              className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                searchOptions.byClass
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-700"
              }`}
            >
              Search by Class
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchField;
