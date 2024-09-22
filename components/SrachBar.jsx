import Image from "next/image";
import React, { useState } from "react";
import SearchResult from "./SearchResult";

const results = [
  {
    title: "Song Titles 1s",
    artist: "Artist Name 1",
    album: "Album Name 1",
    duration: 240,
    genre: "Genre 1",
  },
  {
    title: "Song Title 1s",
    artist: "Artist Name 1",
    album: "Album Name 1",
    duration: 240,
    genre: "Genre 1",
  },
  {
    title: "Song Title 1s",
    artist: "Artist Name 1",
    album: "Album Name 1",
    duration: 240,
    genre: "Genre 1",
  },
];

const SearchBar = ({refetch}) => {
  const [search, setSearch] = useState("");
  return (
    <div className="bg-gray-800 text-white rounded-full px-6 py-4 flex-1 relative">
      <div className="flex items-center">
        <Image src={require("../assets/images/search.svg")} />
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="bg-transparent outline-none text-lg pl-4 w-full"
          placeholder="Search Music, Artist, Genre"
        />
      </div>
      <div
        className={`bg-[#1d1d1d] rounded-lg absolute overflow-hidden duration-300 ease-in-out left-0 right-0 top-16 ${
          search ? "max-h-[600px] border border-[#3d3d3d] " : "h-0 border-none"
        }`}
      >
        <div className="w-full p-6 pt-3">
          <div className="flex gap-5 items-center my-4">
            <Image src={require("../assets/images/headphone.svg")} />
            <div className="text-[20px] text-white font-[600]">
              Search Results
            </div>
          </div>
          <div className="flex flex-col justify-between w-full gap-y-6">
            {results?.map((item, index) => {
              return (
                <SearchResult
                key={index}
                  refetch={() => refetch()}
                  item={item}
                  text={search}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
