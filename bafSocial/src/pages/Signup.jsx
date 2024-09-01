import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <form className="py-10 flex flex-col justify-around items-center w-3/5 shadow-xl">
      <div className="">
        <p className="text-xl text-center">Sign up here</p>
      </div>
      <div className="h-[80%] w-full px-4 flex flex-col items-center justify-center">
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="text"
            id="cpassword"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      <button className="mt-12 bg-blue-500 text-white p-2 px-4 rounded-lg hover:bg-blue-300">
        Register
      </button>
      <div className=" mt-3">
        <p>
          Already have an acoount?
          <Link className="hover:text-blue-950 hover:font-bold" to="/login">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
