import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const { showLogin, setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    toast.info("Password recovery is not implemented yet.");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint =
        state === "Login"
          ? "/api/user/login"
          : "/api/user/register";

      const payload =
        state === "Login"
          ? { email, password }
          : { name, email, password };

      const { data } = await axios.post(backendUrl + endpoint, payload);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowLogin(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setShowLogin]);

  return (
    <div className="fixed inset-0 z-10 backdrop-blur-sm bg-white/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col gap-6 w-full max-w-md"
      >
        <img
          src={assets.cross_icon}
          alt="Close"
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 w-6 h-6 cursor-pointer hover:scale-110 transition"
        />

        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          {state}
        </h1>

        {state !== "Login" && (
          <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-700">
            <img src={assets.profile_icon} alt="User Icon" className="w-5 h-5" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              required
              className="bg-transparent outline-none w-full text-gray-700 dark:text-white"
            />
          </div>
        )}

        <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-700">
          <img src={assets.email_icon} alt="Email Icon" className="w-5 h-5" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email id"
            required
            className="bg-transparent outline-none w-full text-gray-700 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-700 relative">
          <img src={assets.lock_icon} alt="Lock Icon" className="w-5 h-5" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            minLength={6}
            className="bg-transparent outline-none w-full text-gray-700 dark:text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 text-sm text-blue-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <p
          onClick={handleForgotPassword}
          className="text-right text-sm text-blue-600 hover:underline cursor-pointer"
        >
          Forgot password?
        </p>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition disabled:opacity-50"
        >
          {loading
            ? state === "Login"
              ? "Logging in..."
              : "Creating..."
            : state === "Login"
            ? "Login"
            : "Create Account"}
        </button>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-1">
          {state === "Login" ? (
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          )}
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
