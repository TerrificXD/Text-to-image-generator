import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create the global context
export const AppContext = createContext();

// Context Provider component
const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Load user credit and profile data
  const loadCreditData = async () => {
    if (!token) return;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/credit`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setCredit(data.creditBalance);
        setUser((prev) => ({
          ...(prev || {}),
          name: data.user.name,
          creditBalance: data.creditBalance,
        }));
      }
    } catch (error) {
      console.error("Error loading credit data:", error);
      toast.error("Failed to load credit data. Please try again.");
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setCredit(0);
  };

  // Load credit data when token changes
  useEffect(() => {
    if (token) {
      loadCreditData();
    } else {
      setUser(null);
      setCredit(0);
    }
  }, [token]);

  // Generate AI image
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        loadCreditData(); // Update credit after image generation
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditData();
        if (data.creditBalance === 0) {
          navigate("/buy-credit");
        }
      }
    } catch (error) {
      toast.error("Failed to generate image. Please try again.");
    }
  };

  // Global context value
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
