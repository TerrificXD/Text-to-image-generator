import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const BuyCredit = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-center py-6 px-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-full"
    >
      {/* Section Title */}
      <div className="space-y-2 mb-12">
        <h1 className="text-lg uppercase tracking-widest text-gray-500">
          Our Plans
        </h1>
        <h1 className="text-3xl sm:text-4xl font-bold">
          Choose Your Plan
        </h1>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 shadow-md flex flex-col items-center justify-between space-y-4 transition-transform duration-300"
          >
            {/* Plan Title */}
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{item.id}</p>

            {/* Price */}
            <p className="text-3xl font-extrabold text-blue-600">₹{item.price}</p>

            {/* Credits */}
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              {item.credits} credits
            </p>

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              {item.desc}
            </p>

            {/* Buy Button */}
            <button
              onClick={() => {
                if (user) {
                  navigate("/payment");
                } else {
                  setShowLogin(true);
                }
              }}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition"
            >
              {user ? "Buy Now" : "Get Started"}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
