import axios from "axios";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setuserName] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmPasswordMsg, setconfirmPasswordMsg] = useState(false);

  let formData = JSON.stringify({
    email,
    password,
    userName,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (
      userName === "" ||
      password == "" ||
      confirmPassword === "" ||
      email === ""
    ) {
      toast.error("Please enter required info", {
        duration: 2000,
        position: "top-center",
        icon: <AlertTriangle color="red" />,
      });
      return;
    }
    if (password !== confirmPassword) {
      setconfirmPasswordMsg(true);
      setTimeout(() => {
        setconfirmPasswordMsg(false);
      }, 2000);
      return;
    }
    axios
      .post("https://baf-social.onrender.com/auth/register", formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
            required
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            required
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="cpassword">Confirm Password</label>
          {confirmPasswordMsg ? (
            <small className="text-red-400 text-sm">
              Password did not match
            </small>
          ) : (
            ""
          )}
          <input
            type="password"
            id="cpassword"
            value={confirmPassword}
            required
            onChange={(e) => setconfirmPassword(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className="mt-12 bg-blue-500 text-white p-2 px-4 rounded-lg hover:bg-blue-300"
      >
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
