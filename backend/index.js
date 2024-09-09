require("dotenv").config();

const connectDB = require("./connectDB");
const express = require("express");
const cors = require("cors");
// middleware
const app = express();
connectDB();
app.use(express.json());
app.use(  
  cors({
    origin: "*",
  })
);

// routes
const userRouter = require("./routes/user.route");
const notesRouter = require("./routes/notes.route");

app.use("/api/users", userRouter);
app.use("/api/notes", notesRouter);

const port_number=process.env.PORT || 3000;
app.listen(port_number, () => {
  console.log("the server is listening");
});
module.exports = app;
