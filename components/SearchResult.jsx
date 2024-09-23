import React, { useEffect, useState } from "react";
import { convertSecondsToMinutes, formatNumber } from "../utils";
import { Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import {
  useAddSongsToPlaylistMutation,
  useFetchPlaylistsQuery,
} from "../redux/slices/rtkSlices/playlistSlice";
import Card from "../components/Card";

const SearchResult = ({
  item,
  setSelected = () => {},
  selected,
  index,
  text,
  key,
}) => {
  const selectedItem = true;
  const playlist = useSelector((state) => state.playlist?.playlists);
  console.log(playlist, "playlist?.data");
  const { minutes, remainingSeconds } = convertSecondsToMinutes(item?.duration);
  const [playlistsMenu, setPlaylistMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [songMessageType, setSongMEssageType] = useState(null);

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

  const dataII = {
    title: item?.title,
    artist: item?.artist,
    album: item?.album,
    duration: item?.duration,
    genre: item?.genre,
  };

  const handleAddSongs = async (id) => {
    await addSongsPlaylist({
      id: id,
      payload: dataII,
    });
    setSongMEssageType("Song Added Successfully");
    setTimeout(() => {
      setSongMEssageType(null);
    }, 3000);
    setOpen(true);
    await refetch();
  };
  return (
    <div className={`flex flex-wrap rounded-[8px]`}>
      <Card
        key={key}
        title={item?.title}
        description={item?.artist}
        album={item?.album}
        image={item?.image}
        setEditData={() => {}}
        setDeleteData={() => {}}
        isSearch={true}
      />
     
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={() => setOpen(false)}
        message={songMessageType}
        autoHideDuration={3000}
      />
    </div>
  );
};

export default SearchResult;
