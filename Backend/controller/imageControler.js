// controller/imageControler.js
import UserModel from "../DB_Schema_Models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const userId = req.user.userId;  // Get from token
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Missing prompt' });
    }

    const user = await UserModel.findById(userId);
    if (!user || user.creditBalance <= 0) {
      return res.status(400).json({ success: false, message: 'Insufficient credit balance' });
    }

    const formData = new FormData();
    formData.append('prompt', prompt);

    const response = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, { 
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
        ...formData.getHeaders(),
      },
      responseType: 'arraybuffer',
    });

    const imageBuffer = Buffer.from(response.data, 'binary');
    const base64Image = imageBuffer.toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    await UserModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } });
    const updatedUser = await UserModel.findById(userId);

    res.status(200).json({
      success: true,
      message: "Image Generated",
      creditBalance: updatedUser.creditBalance,
      resultImage,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};
