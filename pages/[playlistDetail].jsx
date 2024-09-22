import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SongsRow from "./../components/SongsCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ConfirmationModal from "../components/ConfirmationModal";
import { useDeleteSongsToPlaylistMutation, useFetchPlaylistsQuery } from "../redux/slices/rtkSlices/playlistSlice";

const PlaylistDetail = () => {
  const router = useRouter();
  const data = useSelector((state) => state.playlist.playlists);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDeleteId, setOpenDeleteId] = useState(false);
  const [selected, setSelected] = useState(null);

  const {
    data: refetchedData,
    error,
    isLoading,
    refetch,
  } = useFetchPlaylistsQuery({});
  const [deleteSongsFromPlaylist, { isLoading: isLoadingDelete, error: errorDelete }] =
  useDeleteSongsToPlaylistMutation();

  const { playlistDetail, id } = router.query;

  const currentData = data?.filter((item) => item?._id == id);

  const handleConfirmDelete = () => {
    deleteSongsFromPlaylist({ playListId: d , songId: openDeleteId });
    setOpenDelete(false);
  };

  return (
    <div className="w-full">
      <div className="flex gap-5 items-center my-8">
        <ArrowBackIcon
          className={`text-[#9410AB] cursor-pointer`}
          //   size="100px"
          onClick={() => router.back()}
        />
        <Image src={require("../assets/images/headphone.svg")} />
        <div className="text-[30px] text-white font-[600]">
          Your Songs in Playlist{" "}
          <span className="gradient-text">{playlistDetail}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full gap-y-6">
        {currentData?.[0]?.songs?.map((item, index) => {
          console.log(item, "fedvsdvsdvsdvdv");
          return (
            <SongsRow
              key={index}
              item={item}
              setSelected={() => setSelected(item?._id)}
              setDeleteData={() => {
                setOpenDeleteId(item?._id);
                setOpenDelete(true);
              }}
              selected={selected}
              index={index}
            />
          );
        })}
      </div>
      <ConfirmationModal
        message="Are you sure you want to delete this playlist"
        id={openDeleteId}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default PlaylistDetail;
