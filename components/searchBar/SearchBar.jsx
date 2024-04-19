import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleClick(e) {
      e.preventDefault();
      onSearch(searchQuery);
  }
  return (
    <div className="">
      <div className="relative max-w-sm mx-auto mt-2 focus:outline-none">
        <form>
          <input
            className="w-full py-2 px-4 border bg-gray-800 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 text-gray-400"
            type="text"
            placeholder="Search artist and song here... "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleClick}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-800 border border-gray-300 rounded-r-md hover:bg-gray-400 focus:outline-none "
          >
            <SearchIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
