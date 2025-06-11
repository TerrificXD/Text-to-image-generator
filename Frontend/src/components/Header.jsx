import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion"; // Correct import
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const sampleImages = [
    assets.sample_img_1,
    assets.sample_img_2,
    assets.sample_img_3,
    assets.sample_img_4,
  ];

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="text-center px-6 py-12 bg-white dark:bg-gray-900 text-black dark:text-white space-y-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Label with star icon inline */}
      <motion.div
        className="flex items-center justify-center gap-2 w-fit mx-auto px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="star" className="w-4 h-4" />
      </motion.div>

      {/* Main heading */}
      <motion.p className="text-5xl sm:text-6xl font-semibold leading-tight">
        Turn text to
        <br />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 2 }}
          className="text-blue-600 font-bold"
        >
          Image
        </motion.span>
        , in seconds.
      </motion.p>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="max-w-xl mx-auto text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
      >
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds —<br />
        just type, and watch the magic happen.
      </motion.p>

      {/* Call-to-action button */}
      <motion.button
        onClick={onClickHandler}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { delay: 0.8, duration: 1 },
        }}
        className="mt-4 px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 rounded-full text-lg font-semibold transition duration-300"
      >
        Generate Images... ✨
      </motion.button>

      {/* Image section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-wrap justify-center gap-4 mt-6"
      >
        {sampleImages.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Sample Image ${index + 1}`}
            width={120}
            height="auto"
            className="rounded-md shadow-md transition-transform duration-300 hover:scale-105"
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </motion.div>

      {/* Generated Images Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-4 text-neutral-500 text-lg font-semibold"
      >
        Generated images
      </motion.p>

      {/* Divider */}
      <hr className="border-t border-gray-300 dark:border-gray-700" />
    </motion.div>
  );
};

export default Header;