import React, { useEffect, useState } from "react";
import { convertSecondsToMinutes, formatNumber } from "../utils";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import {
  useAddSongsToPlaylistMutation,
  useFetchPlaylistsQuery,
  useFetchSongsQuery,
} from "../redux/slices/rtkSlices/playlistSlice";

const SearchResult = ({ item, setSelected, selected, index, text, key }) => {
  const selectedItem = true;
  const playlists = useSelector((state) => state.playlist?.playlists);
  const { minutes, remainingSeconds } = convertSecondsToMinutes(item?.duration);
  const [playlistsMenu, setPlaylistMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [debouncedText, setDebouncedText] = useState(text || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, 600);
    return () => {
      clearTimeout(handler);
    };
  }, [text]);

  const { data:dataPlaylist, error:errorPlaylist, isLoading:isLoadingPlaylistlaylist, refetch } = useFetchPlaylistsQuery();
  const { data, error, isLoading, refetch:refetchSongs } = useFetchSongsQuery({text: debouncedText}, {skip:debouncedText == ""});


  const [
    addSongsPlaylist,
    { isLoading: mutationLaoding, error: mutationError },
  ] = useAddSongsToPlaylistMutation();

  const fff = {
    title: item?.title,
    artist: item?.artist,
    album: item?.album,
    duration: item?.duration,
    genre: item?.genre,
  };

  console.log(fff, "Dsvdfvdfvdfv");

  const handleAddSongs = async (id) => {
    await addSongsPlaylist({
      id: id,
      payload: fff,
    });
    await refetch();
  };

  return (
    <div
      key={key}
      className={`flex items-center justify-between py-4 px-6 bg-[#2b2b2b] rounded-[8px]`}
    >
      <div
        className={`text-[20px] font-[600] w-[10%]" ${
          selectedItem ? "gradient-text" : "text-[#B8B8B8]"
        }`}
      >
        {formatNumber(index + 1)}
      </div>
      <div className="w-[30%]">
        <p
          className={`w-fit text-[20px] cursor-pointer ${
            selectedItem ? "gradient-text" : "text-[#B8B8B8]"
          }`}
          onClick={() => setSelected()}
        >
          {item?.title}
        </p>
      </div>
      <div className="w-[30%]">
        <p
          className={`w-fit text-[20px] cursor-pointer ${
            selectedItem ? "gradient-text" : "text-[#B8B8B8]"
          }`}
          onClick={() => setSelected()}
        >
          {item?.artist}
        </p>
      </div>
      <div
        className={`w-[10%] text-[20px] ${
          selectedItem ? "gradient-text" : "text-[#B8B8B8]"
        }`}
      >
        {minutes}
      </div>
      <div className=" flex justify-between items-center ml-4 w-[8%]">
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          aria-controls={Boolean(anchorEl) ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? "true" : undefined}
        >
          <PlaylistAddIcon
            className={`${
              selectedItem ? "text-[#9410AB]" : "text-[#B8B8B8]"
            } cursor-pointer`}
            onClick={() => {
              setPlaylistMenu(true);
            }}
          />
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={playlistsMenu}
        onClose={() => setPlaylistMenu(false)}
      >
        {playlists?.map((item) => (
          <MenuItem key={item} onClick={() => handleAddSongs(item?._id)}>
            {item?.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SearchResult;
