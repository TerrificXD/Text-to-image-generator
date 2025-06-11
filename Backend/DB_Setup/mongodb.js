import mongoose from "mongoose";

// This function connects to the MongoDB database using Mongoose
const connectDB = async () => {
    mongoose.connection.on("connected", () => { // Event listener for successful connection
        console.log("MongoDB connected successfully"); // Log success message
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/Text-to-Image`) // Connect to the MongoDB database using the URI from environment variables
}

export default connectDB; // Export the connectDB function for use in other files