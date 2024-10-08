import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Image from "next/image";
import { Button } from "@mui/material";
import AddPlaylist from "../components/AddPlaylist";
import {
  useDeletePlaylistMutation,
  useFetchPlaylistsQuery,
  useFetchSpotifyPlaylistQuery,
} from "../redux/slices/rtkSlices/playlistSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { playLists } from "../redux/slices/stateSlices/playlistSlice";
import { logout } from "../redux/slices/stateSlices/authSlice";
import Loader from "../components/Loader";
import ConfirmationModal from "./../components/ConfirmationModal";
import Card from "../components/Card";

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

  const playlistsData = data?.data?.map((item) => {
    console.log(item?.imageNumber, "imageNumberimageNumberimageNumber");
    return {
      ...item,
      image: require("../assets/images/musicAlbum.jpg")?.default?.src,
    };
  });

  console.log(playlistsData, "playlistsData");

  useEffect(() => {
    dispatch(playLists(data?.data));
  }, [data?.data?.length]);

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
      <div className="flex justify-between gap-4  my-6 w-full min-[460px]:w-auto">
        <div className="hidden min-[460px]:block text-[#6358DC] text-[16] md:text-[36px] font-[900]">
          Music App
        </div>
        <div className="flex gap-2 justify-between w-full min-[460px]:w-auto">
          <div className="flex items-center">
            <Button
              type="button"
              className="bg-gradient-to-r from-pink-600 to-purple-600 !text-white !rounded-full !text-[12px] md:!text-[14px] !px-3 md:!py-2 md:!px-8"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10 justify-between mb-12">
        <SearchBar />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-5 items-center my-8">
          <Image src={require("../assets/images/music.svg")} />
          <div className="text-[16px] md:text-[30px] text-white font-[600]">
            Your Playlists
          </div>
        </div>
        <div className="flex items-center">
          <Button
            type="button"
            className="bg-gradient-to-r from-pink-600 to-purple-600 !text-white !rounded-full !text-[12px] md:!text-[14px] !px-3 md:!py-2 md:!px-6"
            onClick={() => handleClickOpen()}
          >
            Add Playlist
          </Button>
        </div>
      </div>
      {/* <div className="flex w-full gap-y-6 max-h-[65vh] overflow-y-auto"> */}
      <div className="flex flex-wrap gap-14">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          playlistsData?.map((item, index) => (
            <Card
              key={index}
              title={item?.name}
              description={item?.description}
              image={item?.image}
              setEditData={() => {
                setEditData(item);
                handleClickOpen();
              }}
              setDeleteData={() => {
                setOpenDeleteId(item?._id);
                setOpenDelete(true);
              }}
              click={() => {
                router.push({
                  pathname: `/${item?.name}`,
                  query: { id: item?._id },
                });
              }}
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
        loading={isLoadingDelete}
      />
      <Suggestions />
    </div>
  );
};

export default Home;

const Suggestions = () => {
  const { data, error, isLoading, refetch } = useFetchSpotifyPlaylistQuery();

  return (
    <div>
      <div>
        <div className="flex gap-5 items-center my-8">
          <Image src={require("../assets/images/music.svg")} />
          <div className="text-[16px] md:text-[30px] text-white font-[600]">
            Playlists Recommended for you
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-wrap justify-between gap-3">
          {data?.tracks
            ?.filter((item) => item?.image)
            ?.map((item, index) => {
              return (
                <Card
                  key={index}
                  title={item?.title}
                  description={item?.description}
                  image={item?.image}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};
