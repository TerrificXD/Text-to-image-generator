import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
  const { user, setUser, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img src={assets.logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 text-xl font-bold text-gray-800">AI Image Generator</span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </Link>

          {!user ? (
            <>
              <span
                onClick={() => navigate("/buy-credit")}
                className="cursor-pointer text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Premium
              </span>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm transition duration-200"
              >
                Log In
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* Credits Info */}
              <button
                onClick={() => navigate("/buy-credit")}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold text-gray-700 hover:bg-blue-100 transition duration-200 shadow-sm"
              >
                <img className="w-8 h-5" src={assets.credit_star} alt="Credits" />
                <span>Credits left: {user?.creditBalance ?? 0}</span>
              </button>

              {/* User Greeting */}
              <p className="text-sm font-bold text-gray-700">Hi, {user?.name ?? "User"}</p>

              {/* Avatar with Dropdown */}
              <div className="relative group">
                <img
                  src={assets.profile_icon}
                  alt="User Avatar"
                  className="w-10 drop-shadow cursor-pointer"
                />
                <div className="absolute hidden group-hover:block top-10 right-0 z-10 bg-white rounded-md border shadow-md w-32">
                  <ul className="text-sm">
                    <li
                      onClick={() => {
                        setUser(null);
                        navigate("/");
                      }}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;




// (img) px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition
// (niche waala div) right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-200 invisible z-50
// (ul) w-9 h-9 rounded-full object-cover border border-gray-300 cursor-pointer


//"list-none m-0 p-2 bg-white rounded-md border text-sm"
//"absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12"
//"w-10 drop-shadow"