const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("req.cookies", JSON.stringify(req.cookies));

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
