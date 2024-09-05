import { Camera, User } from "lucide-react";
const TopHome = () => {
  return (
    <div className="p-4 px-12 hidden  h-[20vh] lg:flex items-center justify-between gap-4 ">
      <div className="p-4 rounded-full border  border-white">
        <User size={50} className=" rounded-full" />
      </div>
      <div className="w-full h-full flex flex-col relative">
        <div className="w-full h-[90%] flex gap-4">
          <input
            type="text"
            className="w-4/5 h-3/5 p-3 bg-transparent border rounded-lg border-gray-300"
            placeholder="What is happenning..."
          />
          <div className=" flex flex-col gap-3">
            <div className="flex  items-center justify-center p-4 bg-blue-500 w-[6rem] h-3/5 rounded-lg">
              Post
            </div>
            <div className="w-[7rem] h-[20%] p-4 flex items-center justify-center relative  border">
              <Camera className="absolute" />
              <input
                type="file"
                className="absolute opacity-0 w-full h-full "
                accept="image/png, image/jpg, image/jpeg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHome;
