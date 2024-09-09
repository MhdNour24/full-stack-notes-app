const emailAndpasswordMiddleware = (req, res, next, actionType) => {
  const { fullName, email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: true, message: "email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "password is required" });
  }
  if (actionType === "register") {
    if (!fullName) {
      return res
        .status(400)
        .json({ error: true, message: "Full name is required" });
    }
  }
  next();
};

module.exports = emailAndpasswordMiddleware;
