import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-black dark:text-white px-6 py-6 mt-16 border-t">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="Logo" className="h-8" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            AI Image Generator
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
          © {new Date().getFullYear()} | All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center space-x-4">
          <img
            src={assets.facebook_icon}
            alt="Facebook"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition filter dark:invert"
          />
          <img
            src={assets.twitter_icon}
            alt="Twitter"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition filter dark:invert"
          />
          <img
            src={assets.instagram_icon}
            alt="Instagram"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition filter dark:invert"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
