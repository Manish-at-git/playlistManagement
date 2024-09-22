import React, { useEffect, useState } from "react";
import { convertSecondsToMinutes, formatNumber } from "../utils";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { IconButton, Menu, MenuItem, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import {
  useAddSongsToPlaylistMutation,
  useFetchPlaylistsQuery,
  useFetchSongsQuery,
} from "../redux/slices/rtkSlices/playlistSlice";

const SearchResult = ({
  item,
  setSelected = () => {},
  selected,
  index,
  text,
  key,
}) => {
  const selectedItem = true;
  const playlists = useSelector((state) => state.playlist?.playlists);
  const { minutes, remainingSeconds } = convertSecondsToMinutes(item?.duration);
  const [playlistsMenu, setPlaylistMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [songMessageType, setSongMEssageType] = useState(null)

  const {
    data: dataPlaylist,
    error: errorPlaylist,
    isLoading: isLoadingPlaylistlaylist,
    refetch,
  } = useFetchPlaylistsQuery();

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

  const handleAddSongs = async (id) => {
    await addSongsPlaylist({
      id: id,
      payload: fff,
    });
    setSongMEssageType("Song Added Successfully")
    setTimeout(() => {
      setSongMEssageType(null)
    }, 3000)
    setOpen(true);
    await refetch();
  };

  return (
    <div
      key={key}
      className={`flex gap-1 min-[780px]:gap-0 flex-col min-[780px]:flex-row  items-center justify-start min-[780px]:justify-between py-4 px-6 bg-[#2b2b2b] rounded-[8px]`}
    >
     <div
        className={`text-[16px] min-[780px]:text-[26px] font-[600] w-full min-[780px]:w-[10%] ${
          selectedItem ? "gradient-text" : "text-[#B8B8B8]"
        }`}
      >
        {formatNumber(index + 1)}
      </div>
      <div className="w-full min-[780px]:w-[30%]">
        <p
          className={`w-full min-[780px]:w-fit text-[16px] min-[780px]:text-[26px] cursor-pointer ${
            selectedItem ? "gradient-text" : "text-[#B8B8B8]"
          }`}
          onClick={() => setSelected()}
        >
          {item?.title}
        </p>
      </div>
      <div className="w-full min-[780px]:w-[30%]">
        <p
          className={`w-full min-[780px]:w-fit text-[16px] min-[780px]:text-[26px] cursor-pointer ${
            selectedItem ? "gradient-text" : "text-[#B8B8B8]"
          }`}
          onClick={() => setSelected()}
        >
          {item?.artist}
        </p>
      </div>
      <div
         className={`w-full min-[780px]:w-[10%] text-[16px] min-[780px]:text-[26px] ${
          selectedItem ? "gradient-text" : "text-[#B8B8B8]"
        }`}
      >
        {minutes}
      </div>
      <div className=" flex justify-start min-[780px]:justify-between items-center  min-[780px]:ml-4 gap-3 min-[780px]:gap-0 w-full min-[780px]:w-[8%]">
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          aria-controls={Boolean(anchorEl) ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? "true" : undefined}
        >
          <PlaylistAddIcon
            className={`${selectedItem ? "text-[#9410AB]" : "text-[#B8B8B8]"} ${
              playlists?.length ? "" : "opacity-50"
            } cursor-pointer`}
            onClick={() => {
              if (playlists?.length) {
                setPlaylistMenu(true);
              } else {
                setSongMEssageType("Please create a playlist first")
                setTimeout(() => {
                  setSongMEssageType(null)
                }, 3000)
                setOpen(true);
              }
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={() => setOpen(false)}
        message={songMessageType}
        autoHideDuration={3000} // Automatically close after 3 seconds
      />
    </div>
  );
};

export default SearchResult;
