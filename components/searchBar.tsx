import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    // <form className="mx-auto">
    <div className="relative w-full">
      <div className="absolute flex left-3 items-center center-absolute pointer-events-none">
        <FaSearch color="#777" />
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full px-3 py-2 ps-10 text-sm text-primary border border-[#777] rounded-lg bg-transparent"
        // placeholder=""
        required
      />
    </div>
    // </form>
  );
};

export default SearchBar;
