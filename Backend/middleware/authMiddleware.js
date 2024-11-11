import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log(token);
  
  if (!token) {
    return res.status(400).json({
      message: "Token not found",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);

    console.log('decode', decode);

    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).json({
      message: `Error ${error}`,
    });
  }
};

export default authMiddleware;
