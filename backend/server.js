const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8000;


const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

require("./config/database").connect();

const user = require("./routes/authRoutes");
app.use("/api/v1", user);

const chatRoutes = require("./routes/chatRoutes");
app.use("/api/v1", chatRoutes);

app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`);
});