import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { formatNumber } from "../utils";
import { useDeletePlaylistMutation } from "../redux/slices/rtkSlices/playlistSlice";

const PlaylistRow = ({ item, setSelected, selected, index, setEditData, setDeleteData, key }) => {
  console.log(item, "xvsdvdvdfvdfvdfvdfv")

  const selectedItem = item?._id == selected;

  return (
    <div
      key={key}
      className={`flex gap-1 md:gap-0 flex-col md:flex-row  items-center justify-start md:justify-between py-4 px-6 bg-[#1d1d1d] rounded-[8px]`}
    >
      <div
        className={`text-[16px] md:text-[26px] font-[600] w-full md:w-[10%] ${
          selectedItem ? "gradient-text" : "text-[#B8B8B8]"
        }`}
      >
        {formatNumber(index + 1)}
      </div>
      <div className="w-full md:w-[30%]">
        <p
          className={`w-full md:w-fit text-[16px] md:text-[26px] cursor-pointer ${
            selectedItem ? "gradient-text" : "text-[#B8B8B8]"
          }`}
          onClick={() => setSelected()}
        >
          {item?.name}
        </p>
      </div>
      <div className="w-full md:w-[30%]">
        <p
          className={`w-full md:w-fit text-[16px] md:text-[26px] cursor-pointer ${
            selectedItem ? "gradient-text" : "text-[#B8B8B8]"
          }`}
          onClick={() => setSelected()}
        >
          {item?.description}
        </p>
      </div>
      <div
        className={`w-full md:w-[10%] text-[16px] md:text-[26px] ${
          selectedItem ? "gradient-text" : "text-[#B8B8B8]"
        }`}
      >
        {item.songs.length}
      </div>
      <div className=" flex justify-start md:justify-between items-center md:ml-4 gap-3 md:gap-0 w-full md:w-[8%]">
        <EditIcon
          className={`text-[#B8B8B8] cursor-pointer`}
          onClick={() => setEditData()}
        />
        <DeleteForeverIcon
          className={`text-red-500 cursor-pointer`}
          onClick={() => setDeleteData()}
        />
      </div>
    </div>
  );
};

export default PlaylistRow;
