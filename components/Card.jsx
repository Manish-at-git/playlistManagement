import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddSongsToPlaylistMutation,
  useFetchPlaylistsQuery,
} from "../redux/slices/rtkSlices/playlistSlice";

function Cards({
  key,
  title,
  description,
  album = "",
  image,
  click = undefined,
  setEditData,
  setDeleteData,
  isSearch = false,
}) {
  const isPlaylistCard = typeof click == "function";

  const selectedItem = true;
  const playlist = useSelector((state) => state.playlist?.playlists);
  console.log(playlist, "playlist?.data");
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
    title: title,
    artist: description,
    album: album,
    duration: "10",
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
    <div
      key={key}
      className={`w-[230px] relative rounded-b overflow-hidden mt-3 bg-transparent ${
        isPlaylistCard ? "cursor-pointer" : ""
      }`}
      style={{ marginLeft: "25px" }}
      onClick={isPlaylistCard ? () => click() : () => {}}
    >
      <div className="absolute z-[40] top-2 right-2">
        {isPlaylistCard ? (
          <div className=" flex justify-start md:justify-between items-center md:ml-4 gap-3 w-full md:w-[8%]">
            <EditIcon
              className={`text-[#B8B8B8] cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                setEditData();
              }}
            />
            <DeleteForeverIcon
              className={`text-red-500 cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                setDeleteData();
              }}
            />
          </div>
        ) : isSearch ? (
          <div className="bg-gray-700 rounded-md">
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              aria-controls={Boolean(anchorEl) ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? "true" : undefined}
            >
              <PlaylistAddIcon
                className={`${selectedItem ? "text-[#fff]" : "text-[#fff]"} ${
                  playlist?.length ? "" : "opacity-50"
                } cursor-pointer`}
                onClick={() => {
                  if (playlist?.length) {
                    setPlaylistMenu(true);
                  } else {
                    setSongMEssageType("Please create a playlist first");
                    setTimeout(() => {
                      setSongMEssageType(null);
                    }, 3000);
                    setOpen(true);
                  }
                }}
              />
            </IconButton>
          </div>
        ) : (
          <div className=" flex justify-start md:justify-between items-center md:ml-4 gap-3 p-1 rounded-md w-fit bg-gray-700">
            <DeleteForeverIcon
              className={`text-white cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                setDeleteData();
              }}
            />
          </div>
        )}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={playlistsMenu}
        onClose={() => setPlaylistMenu(false)}
      >
        {playlist?.map((item) => (
          <MenuItem key={item} onClick={() => handleAddSongs(item?._id)}>
            {item?.name}
          </MenuItem>
        ))}
      </Menu>
      <div className="border-transparent bg-c1a1a1a text-white relative">
        <img
          src={`${image}`}
          alt=""
          className="object-cover w-full h-52 rounded-[10px]"
        />
        <span className="bg-c1a1a1a p-2.5 absolute top-0 left-0 cursor-pointer opacity-80 add"></span>
        <div className="py-2 px-1">
          <div className="text-sm tracking-wide hover:underline text-white cursor-pointer">
            {!isPlaylistCard ? "Title - " : ""} {title}
          </div>
          <div className="text-sm tracking-wide text-white font-thin">
            {!isPlaylistCard ? "Artist - " : ""} {description?.slice(0, 20)}{" "}
            {description?.slice(0, 20)?.length > 20 ? "..." : ""}
          </div>
          <div className="text-sm tracking-wide text-white font-thin">
            {!isPlaylistCard ? "Album - " : ""}
            {album?.slice(0, 20)}{" "}
            {album?.slice(0, 20)?.length > 20 ? "..." : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
