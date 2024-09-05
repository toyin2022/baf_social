import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../stateManager/userSlice";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    setloading(true);
    const formData = JSON.stringify({ email, password });
    axios
      .post("https://baf-social.onrender.com/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.success("Login successfully");
        setloading(false);
        dispatch(login(response.data.user));
        navigate("/");
      })
      .catch((error) => {
        setloading(false);

        toast.error("Login failed, Check your credentials");
        console.log(error);
      });
  }
  return (
    <form className="py-10 flex flex-col justify-around items-center w-3/5 shadow-lg">
      <div className="">
        <p className="text-xl text-center">Login here</p>
      </div>
      <div className="h-[80%] w-full px-4 flex flex-col items-center justify-center">
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      {loading ? (
        <p className="mt-12 bg-blue-500 text-white p-2 px-4 rounded-lg hover:bg-blue-300">
          ...
        </p>
      ) : (
        <button
          type="submit"
          onClick={(e) => handleLogin(e)}
          className="mt-12 bg-blue-500 text-white p-2 px-4 rounded-lg hover:bg-blue-300"
        >
          Login
        </button>
      )}
      <div className=" mt-3">
        <p>
          {"Don't"} have an acoount?{" "}
          <Link className="hover:text-blue-950 hover:font-bold" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
