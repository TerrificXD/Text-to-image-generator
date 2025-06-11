import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./DB_Setup/mongodb.js";
import userRouter from "./Routes/userRoutes.js";
import imageRouter from "./Routes/imageRoutes.js";
import userAuth from "./Middlewares/auth.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

app.use("/api/user", userRouter);
app.use("/api/image", userAuth, imageRouter);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
