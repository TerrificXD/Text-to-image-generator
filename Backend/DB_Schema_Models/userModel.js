import mongoose from "mongoose";

// This code defines a Mongoose schema and model for a User in a MongoDB database.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    creditBalance: {
        type: Number,
        default: 10,
    },
})

const UserModel = mongoose.models.User || mongoose.model("User", userSchema); // first check if the model is already defined, if not, define it
export default UserModel;
