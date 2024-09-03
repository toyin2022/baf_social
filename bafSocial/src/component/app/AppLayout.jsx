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
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../stateManager/userSlice";
// import { logoutState } from "../../stateManager/userSlice";

const AppLayout = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function Logout() {
    axios
      .post("https://baf-social.onrender.com/auth/logout")
      .then(() => {
        toast.success("Logout successfully");
        dispatch(logout());
        navigate("/login");
      })
      .catch((error) => {
        toast.error("I dont know why you have a logout error o");
        console.log(error);
      });
  }
  return (
    <Popover>
      <div className="flex lg:flex-row flex-col h-[100vh] w-full relative ">
        <div className="content h-[100%] w-[100%] lg:w-[100%]">
          {user === null ? <p>Lorem please login first</p> : <Outlet />}
        </div>
        <div className="w-full hidden lg:w-[22%] lg:absolute lg:left-0  bg-slate-950 text-white lg:flex  py-8 lg:flex-col gap-12 items-center lg:h-[100vh] h-[10%]">
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
                <p className="font-bold">
                  {user?.userName ? user.userName : "Login"}
                </p>
                <p className="text-sm">
                  {user?.email.substring(0, 10) + "..."}
                </p>
              </div>
              <p className="text-xl font-extrabold">...</p>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="py-8 text-white bg-transparent backdrop-blur-xl flex flex-col gap-5">
              <div className="flex flex-col items-center justify-center ">
                <p className="p-3 text-xl font-bold">Your Accounts </p>
                <p className="font-bold">
                  {user?.userName ? user.userName : "Login"}
                </p>
                <p className="text-sm">
                  {user?.email ? user.email : "youremail@email.com"}
                </p>
              </div>
              <div className="h-[1px] bg-slate-300 w-full" />
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="p-3  cursor-pointer hover:scale-95 transition flex items-center justify-center bg-blue-900 rounded-2xl"
                >
                  Add a new account
                </Link>
                {user === null ? (
                  <Link to="/login">
                    <p className="p-3  cursor-pointer hover:scale-95 transition flex items-center justify-center bg-green-700 rounded-2xl">
                      Login
                    </p>
                  </Link>
                ) : (
                  <p
                    onClick={Logout}
                    className="p-3  cursor-pointer hover:scale-95 transition flex items-center justify-center bg-red-700 rounded-2xl"
                  >
                    Logout
                  </p>
                )}
              </div>
            </div>
          </PopoverContent>
        </div>
        <div className="w-full lg:w-[22%] lg:absolute lg:left-0  bg-slate-950 text-white flex lg:hidden py-8 lg:flex-col gap-12 items-center lg:h-[100vh] h-[10%]">
          <ul className="flex justify-center">
            <Link
              to="/"
              className="p-4 flex gap-3 items-center hover:bg-slate-400/40 rounded-2xl"
            >
              <HomeIcon color="white" />
            </Link>
            <Link
              to="/profile"
              className="p-4 flex gap-3 items-center hover:bg-slate-400/40 rounded-2xl"
            >
              <User />
            </Link>
            <Link
              to="/my-posts"
              className="p-4 flex gap-3 items-center hover:bg-slate-400/40 rounded-2xl"
            >
              <Speaker />
            </Link>
            <Link
              to="/liked-post"
              className="p-4 flex gap-3 items-center hover:bg-slate-400/40 rounded-2xl"
            >
              <HeartIcon />
            </Link>
            <Link
              to="/saved-post"
              className="p-4 flex gap-3 items-center hover:bg-slate-400/40 rounded-2xl"
            >
              <Bookmark />
            </Link>
            <PopoverTrigger className="w-full flex items-center justify-center">
              <div className=" flex gap-4 items-center justify-center  cursor-pointer px-2  rounded-3xl py-2 hover:bg-slate-400/40 hover:scale-105 transition">
                <p className="text-xl font-extrabold">...</p>
              </div>
            </PopoverTrigger>
          </ul>
        </div>
      </div>
    </Popover>
  );
};

export default AppLayout;
