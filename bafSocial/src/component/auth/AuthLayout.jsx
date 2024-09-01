import { Outlet } from "react-router-dom";
import authImg from "../../assets/auth.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex  w-full items-center justify-center flex-col py-10">
      <div className="flex flex-col">
        <h1 className="text-2xl">
          Welcome to <span className="text-blue-950 font-bold">COTICKET</span>
        </h1>
      </div>
      <div className="flex w-[90vw]  items-center justify-center">
        <div className="w-1/2 flex items-center justify-center">{children}</div>
        <div className="w-1/2">
          <img src={authImg} className="w" alt="authentication" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
