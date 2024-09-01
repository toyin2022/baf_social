import { Link, Outlet } from "react-router-dom";
import logosvg from "../../assets/coticketlogo.png";
import {
  Bookmark,
  HeartIcon,
  HomeIcon,
  Speaker,
  User,
  UserCheck2Icon,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const AppLayout = () => {
  return (
    <Popover>
      <div className="flex w-full ">
        <div className="w-[22%] bg-slate-950 text-white flex py-8 flex-col gap-12 items-center  h-[100vh]">
          <div className="flex gap-2 items-center">
            <img
              src={logosvg}
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
            <p className="text-4xl font-bold font-logo">COTICKET</p>
          </div>
          <nav>
            <ul>
              <Link
                to="/"
                className="p-4 flex gap-3 items-center hover:bg-slate-400/40 rounded-2xl"
              >
                <HomeIcon color="white" />
                <p>Home</p>
              </Link>
              <Link
                to="/profile"
                className="p-4 flex gap-3 items-center hover:bg-slate-400/40 rounded-2xl"
              >
                <User />
                <p>Profile</p>
              </Link>
              <Link
                to="/my-posts"
                className="p-4 flex gap-3 items-center hover:bg-slate-400/40 rounded-2xl"
              >
                <Speaker />
                <p>My Posts</p>
              </Link>
              <Link
                to="/liked-post"
                className="p-4 flex gap-3 items-center hover:bg-slate-400/40 rounded-2xl"
              >
                <HeartIcon />
                <p>Liked Posts</p>
              </Link>
              <Link
                to="/saved-post"
                className="p-4 flex gap-3 items-center hover:bg-slate-400/40 rounded-2xl"
              >
                <Bookmark />
                <p>Saved Posts</p>
              </Link>
            </ul>
          </nav>
          <div className="mt-3 cursor-pointer hover:bg-blue-950 bg-blue-500 p-4 rounded-3xl">
            Post New Feed
          </div>

          <PopoverTrigger className="w-full flex items-center justify-center">
            <div className=" flex gap-4 items-center justify-center w-4/5  cursor-pointer  rounded-3xl py-2 hover:bg-slate-400/40 hover:scale-105 transition">
              <UserCheck2Icon />
              <div className="flex justify-center flex-col">
                <p className="font-bold">Code with toyin</p>
                <p className="text-sm">
                  {"codewithtoyin@gmail.com".substring(0, 10) + "..."}
                </p>
              </div>
              <p className="text-xl font-extrabold">...</p>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="py-8 text-white bg-transparent backdrop-blur-xl flex flex-col gap-5">
              <div className="flex flex-col items-center justify-center ">
                <p className="p-3 text-xl font-bold">Your Accounts </p>
                <p className="font-bold">Code with toyin</p>
                <p className="text-sm">codewithtoyin@gmail.com</p>
              </div>
              <div className="h-[1px] bg-slate-300 w-full" />
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="p-3  cursor-pointer hover:scale-95 transition flex items-center justify-center bg-blue-900 rounded-2xl"
                >
                  Add a new account
                </Link>
                <p className="p-3  cursor-pointer hover:scale-95 transition flex items-center justify-center bg-red-700 rounded-2xl">
                  Logout
                </p>
              </div>
            </div>
          </PopoverContent>
        </div>
        <div className="content w-[83%]">
          <Outlet />
        </div>
      </div>
    </Popover>
  );
};

export default AppLayout;
