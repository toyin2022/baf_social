import { Dot, UserCheck2 } from "lucide-react";
import imag from "../assets/hero-bg.jpg";
const Post = ({ content, image }) => {
  return (
    <div className="w-[90%] py-4 shadow-sm shadow-gray-500 p-2 flex flex-col items-center justify-center">
      <div className="flex justify-between w-full">
        <div className="flex gap-1 ">
          <div className="w-12 h-12 lg:w-16 lg:h-16 mr-3 rounded-full bg-slate-400 flex items-center justify-center">
            <UserCheck2 />
          </div>
          <div className="lg:flex lg:gap-1">
            <div className="flex flex-col lg:gap-3 ">
              <p className="font-bold text-lg">Oluwatoyin Oni</p>
            </div>
            <div className="flex -mt-2 lg:mt-0">
              <p className="text-gray-600  ">@toyin_code</p>
              <Dot className="text-gray-600" />
              <p className=" text-gray-600">6h</p>
            </div>
          </div>
        </div>
        <div className=" flex items-start text-2xl font-bold">...</div>
      </div>
      <div className="w-[90%] ml-16 lg:-mt-8 flex gap-4 justify-center flex-col">
        <p>{content}</p>
        <img className="w-[90%] rounded-md" src={image} alt="" />
      </div>
    </div>
  );
};

export default Post;
