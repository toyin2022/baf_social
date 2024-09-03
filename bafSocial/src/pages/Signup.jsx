// src/component/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { InputOTPDemo } from "../component/OtpModal"; // Import the OTP input demo component

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setuserName] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [otp, setotp] = useState(""); // State to manage OTP input
  const [confirmPasswordMsg, setconfirmPasswordMsg] = useState(false);
  const [otpModal, setotpModal] = useState(false);

  const navigate = useNavigate();

  const formData = JSON.stringify({
    email,
    password,
    userName,
  });

  // Handle form submission for signup
  function handleSubmit(e) {
    e.preventDefault();
    if (
      userName === "" ||
      password === "" ||
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
      .post("https://baf-social.onrender.com/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        setotpModal(true);
        toast(response.data.message);
      })
      .catch(function (error) {
        toast(error.response.data.message);
      });
  }

  const otpForm = JSON.stringify({
    email,
    otp,
  });

  // Handle OTP input changes
  const handleOtpChange = (newOtp) => {
    setotp(newOtp); // Update OTP state with the new value
  };

  // Handle OTP verification
  function handleOtp(e) {
    e.preventDefault();
    axios
      .post("https://baf-social.onrender.com/auth/verify-otp", otpForm, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast(response.data.message);
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className=" w-full lg:w-3/5 py-10 flex flex-col justify-around items-center relative">
      <form className="py-10 flex flex-col justify-around items-center w-full shadow-xl">
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
              className="border p-2"
            />
          </div>
          <div className="flex flex-col w-full mt-4">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              required
              id="userName"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              className="border p-2"
            />
          </div>
          <div className="flex flex-col w-full mt-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="border p-2"
            />
          </div>
          <div className="flex flex-col w-full mt-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              required
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              className="border p-2"
            />
            {confirmPasswordMsg && (
              <p className="text-red-500 text-sm mt-2">
                Passwords do not match!
              </p>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 bg-blue-500 text-white p-2 px-4 rounded-lg hover:bg-blue-300"
          >
            Sign Up
          </button>
        </div>
      </form>

      {/* OTP Modal */}
      {otpModal && (
        <div className="absolute w-[95%] lg:w-[50vw] flex items-center justify-center flex-col lg:h-[30vh] h-[40vh] px-5 rounded-md bg-transparent text- backdrop-blur-xl lg:top-[30%] lg:left-[20%]">
          <h1 className="text-2xl">Please verify your OTP here</h1>
          <p>Otp has been sent to your email, check and please verify</p>
          {/* OTP Input Component */}
          <InputOTPDemo value={otp} onChange={handleOtpChange} />
          <button
            className="mt-4 bg-green-500 text-white p-2 px-4 rounded-lg hover:bg-green-300"
            onClick={handleOtp}
          >
            Submit OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default Signup;
