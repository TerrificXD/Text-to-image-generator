//  components/GenerateBTN.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const GenerateBTN = () => {
    const { user, setShowLogin } = useContext(AppContext);
    const navigate = useNavigate();

    const onClickHandler = () => {
        if (user) {
            navigate("/result");
        } else {
            setShowLogin(true);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center py-16 bg-white dark:bg-gray-900 text-black dark:text-white space-y-6"
        >
            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-bold max-w-2xl mx-auto">
                See the magic in action. Try it now!
            </h1>

            {/* Generate Button */}
            <motion.button
                onClick={onClickHandler}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-full transition duration-300 shadow-md hover:shadow-lg"
            >
                Generate
            </motion.button>
        </motion.div>
    );
};

export default GenerateBTN;