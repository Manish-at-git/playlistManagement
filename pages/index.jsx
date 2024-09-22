import React, { useEffect, useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import SearchBar from "../components/SrachBar";
import Image from "next/image";
import { Button } from "@mui/material";
import AddPlaylist from "../components/AddPlaylist";
import {
  useDeletePlaylistMutation,
  useFetchPlaylistsQuery,
} from "../redux/slices/rtkSlices/playlistSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { playLists } from "../redux/slices/stateSlices/playlistSlice";
import { logout } from "../redux/slices/stateSlices/authSlice";
import Loader from "../components/Loader";
import ConfirmationModal from "./../components/ConfirmationModal";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDeleteId, setOpenDeleteId] = useState(false);

  const { data, error, isLoading, refetch } = useFetchPlaylistsQuery();
  const [deletePlaylist, { isLoading: isLoadingDelete, error: errorDelete }] =
    useDeletePlaylistMutation();

  useEffect(() => {
    dispatch(playLists(data));
  }, [data?.length]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePlaylist({ id: openDeleteId }).unwrap(); 
      setOpenDelete(false); 
      refetch(); 
    } catch (error) {
      console.error("Failed to delete playlist:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-10 justify-between my-12">
        <SearchBar />
        <div className="flex justify-end gap-4"><Button
          type="button"
          className="bg-gradient-to-r from-pink-600 to-purple-600 !text-white !rounded-full !text-[12px] md:!text-[14px] !px-3 md:!py-2 md:!px-6"
          onClick={() => handleClickOpen()}
        >
          Add Playlist
        </Button>
        <Button
          type="button"
          className="bg-gradient-to-r from-pink-600 to-purple-600 !text-white !rounded-full !text-[12px] md:!text-[14px] !px-3 md:!py-2 md:!px-8"
          onClick={() => handleLogout()}
        >
          Logout
        </Button></div>
      </div>
      <div>
        <div className="flex gap-5 items-center my-8">
          <Image src={require("../assets/images/music.svg")} />
          <div className="text-[30px] text-white font-[600]">
            Your Playlists
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full gap-y-6 max-h-[70vh] overflow-y-auto">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          data?.map((item, index) => (
            <PlaylistCard
            key={index}
              item={item}
              setSelected={() => {
                setSelected(item?._id);
                router.push({
                  pathname: `/${item?.name}`,
                  query: { id: item?._id },
                });
              }}
              setEditData={() => {
                setEditData(item);
                handleClickOpen();
              }}
              setDeleteData={() => {
                setOpenDeleteId(item?._id);
                setOpenDelete(true);
              }}
              selected={selected}
              index={index}
            />
          ))
        )}
      </div>
      <AddPlaylist
        open={open}
        handleClose={() => {
          setEditData(null);
          handleClose();
        }}
        data={editData}
        refetch={refetch}
      />
      <ConfirmationModal
        message="Are you sure you want to delete this playlist"
        id={openDeleteId}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
        refetch={refetch}
      />
    </div>
  );
};

export default Home;
