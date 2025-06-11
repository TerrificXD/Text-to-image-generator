import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  // 1. Get token from header
  const authHeader = req.headers.authorization;
  
  // 2. Check if token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided or invalid format"
    });
  }

  // 3. Extract token
  const token = authHeader.split(" ")[1];

  try {
    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 5. Check for user ID in token
    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload"
      });
    }

    // 6. Attach user to request
    req.user = {
      userId: decoded.id
    };
    
    next();
  } catch (error) {
    // 7. Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        success: false,
        message: "Token expired"
      });
    }
    return res.status(403).json({
      success: false,
      message: "Invalid token"
    });
  }
};

export default userAuth;