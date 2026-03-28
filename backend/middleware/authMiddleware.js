import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("🔐 AUTH MIDDLEWARE HIT");
  console.log("🔐 AUTH HEADER:", req.headers.authorization);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ TOKEN MISSING");
    return res.status(401).json({ message: "No token, access denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ TOKEN DECODED:", decoded);

    req.userId = decoded.id;
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.log("❌ TOKEN INVALID");
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
