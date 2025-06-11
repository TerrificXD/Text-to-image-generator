import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1); // Initial placeholder image
  const [imageGenerated, setImageGenerated] = useState(false); // Track if image was generated
  const [loading, setLoading] = useState(false); // Loading state
  const [input, setInput] = useState(""); // Text prompt input

  const { generateImage } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const result = await generateImage(input);
    if (result) {
      setImage(result);
      setImageGenerated(true);
      setInput(""); // clear input
    }
    setLoading(false);
  };

  return (
    <div className="min-h-full w-full bg-white dark:bg-gray-900 flex items-center justify-center px-4 py-8">
      <motion.form
        initial={{ opacity: 0.2, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center h-full w-full gap-8"
      >
        {/* Image Preview */}
        <div className="relative rounded-lg shadow-md overflow-hidden">
          <img
            src={image}
            alt="Generated Result"
            className={`max-w-xs rounded-lg ${loading ? "opacity-50" : "opacity-100"} transition-opacity duration-300`}
          />
          {/* Loading Indicator Bar */}
          <span
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 ${
              loading ? "w-full animate-pulse" : "w-0"
            }`}
          />
        </div>

        {/* Loading Text */}
        {loading && <p className="text-purple-500">Generating Image...</p>}

        {/* Prompt Input & Submit */}
        {!imageGenerated && (
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter prompt"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white placeholder-gray-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Image"}
            </button>
          </div>
        )}

        {/* After Image Generation */}
        {imageGenerated && (
          <div className="flex gap-4">
            <button
              onClick={() => setImageGenerated(false)}
              className="bg-gray-500 hover:bg-gray-600 text-gray-100 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Generate Another
            </button>
            <a
              href={image}
              download
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Download
            </a>
          </div>
        )}
      </motion.form>
    </div>
  );
};

export default Result;
