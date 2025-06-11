import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-900 py-16 px-6 text-center text-black dark:text-white"
    >
      {/* Title Section */}
      <div className="space-y-4 mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold">Create AI Images</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Turn your imaginations into visuals
        </p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 max-w-6xl mx-auto text-left">
        {/* Text Block */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-semibold">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!
          </p>
        </div>

        {/* Image Block */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.img
            src={assets.sample_img_2}
            alt="AI Sample 1"
            className="rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition duration-500 cursor-pointer object-cover h-64 w-full"
            whileHover={{ scale: 1.05 }}
          />
          <motion.img
            src={assets.sample_img_3}
            alt="AI Sample 2"
            className="rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition duration-500 cursor-pointer object-cover h-64 w-full"
            whileHover={{ scale: 1.05 }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12">
        <hr className="border-t border-gray-300 dark:border-gray-700" />
      </div>
    </motion.div>
  );
};

export default Description;
