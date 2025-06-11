import UserModel from '../DB_Schema_Models/userModel.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email is already taken" });
        }

        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

        const user = await UserModel.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Registration failed", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Login failed", error: error.message });
    }
};

const userCredit = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            creditBalance: user.creditBalance,
            user: { name: user.name }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const addCredits = async (req, res) => {
    try {
        const { credits } = req.body;
        if (!credits || credits <= 0) {
            return res.status(400).json({ success: false, message: "Invalid credit amount" });
        }

        await UserModel.findByIdAndUpdate(req.user.userId, { $inc: { creditBalance: credits } });
        const updatedUser = await UserModel.findById(req.user.userId);

        res.status(200).json({
            success: true,
            message: "Credits added successfully",
            creditBalance: updatedUser.creditBalance
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { registerUser, loginUser, userCredit, addCredits };
