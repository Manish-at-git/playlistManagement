import Image from "next/image";
import React, { useEffect, useState } from "react";
import SearchResult from "./SearchResult";
import { useFetchSongsQuery } from "../redux/slices/rtkSlices/playlistSlice";

const results = [
  {
    title: "Songaw Titles 1s",
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
  const [debouncedText, setDebouncedText] = useState(search || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(search);
    }, 600);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, error, isLoading, refetch:refetchSongs } = useFetchSongsQuery({text: debouncedText}, {skip:debouncedText == ""});

  return (
    <div className="bg-gray-800 text-white rounded-full px-4 py-2 md:px-6 md:py-4 flex-1 relative">
      <div className="flex items-center">
        <Image src={require("../assets/images/search.svg")} />
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="bg-transparent outline-none text-sm md:text-lg pl-4 w-full"
          placeholder="Search Music, Artist, Genre"
        />
      </div>
      <div
        className={`bg-[#1d1d1d] rounded-lg absolute overflow-hidden duration-300 ease-in-out left-0 right-0 top-16 z-50 ${
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
          <div className="flex flex-col justify-between w-full gap-y-6 overflow-scroll max-h-[500px]">
            {data?.map((item, index) => {
              return (
                <SearchResult
                  key={index}
                  // setSelected={setSelected}
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
