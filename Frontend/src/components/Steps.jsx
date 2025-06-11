import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-900 text-black dark:text-white py-10 px-6"
    >
      {/* Section Heading */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold">How it works</h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Follow these simple steps to generate your images:
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {stepsData.map((step, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md transition-transform duration-300"
          >
            <img src={step.icon} alt={step.title} className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-10">
        <hr className="border-t border-gray-300 dark:border-gray-700" />
      </div>
    </motion.div>
  );
};

export default Steps;
