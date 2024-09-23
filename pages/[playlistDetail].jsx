import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ConfirmationModal from "../components/ConfirmationModal";
import {
  useDeleteSongsToPlaylistMutation,
  useFetchPlaylistsQuery,
} from "../redux/slices/rtkSlices/playlistSlice";
import Card from "../components/Card";
import Loader from "../components/Loader"

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
  } = useFetchPlaylistsQuery();
  const [
    deleteSongsFromPlaylist,
    { isLoading: isLoadingDelete, error: errorDelete },
  ] = useDeleteSongsToPlaylistMutation();

  const { playlistDetail, id } = router.query;

  const currentData = refetchedData?.data?.filter((item) => item?._id == id);

  const handleConfirmDelete = async () => {
    await deleteSongsFromPlaylist({ id: id, songId: openDeleteId });
    await refetch();
    setOpenDelete(false);
  };

  const trackData = currentData?.map((item) => {
    return item?.songs?.map((item) => {
      return {
        ...item,
        image: require("../assets/images/musicAlbum2.jpeg")?.default?.src,
      };
    });
  });


  return (
    <div className="w-full">
      <div className="flex gap-5 items-center my-8">
        <ArrowBackIcon
          className={`text-[#9410AB] cursor-pointer h-[20px]`}
          onClick={() => router.back()}
        />
        <Image src={require("../assets/images/headphone.svg")} />
        <div className="text-[16px] md:text-[30px] text-white font-[600]">
          {/* <div className="text-[30px] text-white font-[600]"> */}
          Your Songs in Playlist{" "}
          <span className="gradient-text">{playlistDetail}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full gap-y-6">
        <div className="flex flex-wrap gap-14">
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            trackData?.[0]?.map((item, index) => {
              console.log(item, "item")
              return (
                <Card
                key={index}
                title={item?.title}
                description={item?.artist}
                album={item?.album}
                image={item?.image}
                setDeleteData={() => {
                  setOpenDeleteId(item?._id);
                  setOpenDelete(true);
                }}
              />
              );
            })
          )}
        </div>
      </div>
      <ConfirmationModal
        message="Are you sure you want to delete this playlist"
        id={openDeleteId}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
        loading={isLoading}
      />
    </div>
  );
};

export default PlaylistDetail;
