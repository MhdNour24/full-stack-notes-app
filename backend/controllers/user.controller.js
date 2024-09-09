const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const create_accout = async (req, res) => {
  const { fullName, email, password } = req.body;

  // التحقق مما إذا كان المستخدم موجودًا بالفعل
  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }

  // إنشاء مستخدم جديد
  const user = new User({
    email: email,
    fullName: fullName,
    password: password,
  });
  await user.save();

  // إنشاء رمز الوصول (Access Token)
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res
    .status(201)
    .json({
      error: false,
      user: user,
      accessToken: accessToken,
      message: "Registration Successful",
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user || user.password !== password) {
    return res
      .status(401)
      .json({ error: true, message: "Invalid credentials" });
  }

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res
    .status(200)
    .json({
      error: false,
      email: email,
      accessToken: accessToken,
      message: "Login Successful",
    });
};

const getUser = async (req, res, next) => {
  const { user } = req.user;
  const isUser  = await User.findOne({ _id: user._id });
  if (!isUser) {
    return res.sendStatus(401);
  }
  return res.json({ user: {fullName:isUser.fullName,email:isUser.email,"_id":isUser._id,createdOn:isUser.createdOn}, message: "" });
};

module.exports = {
  create_accout,
  login,
  getUser,
};
