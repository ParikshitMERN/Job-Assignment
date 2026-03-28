const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/favourites", favouriteRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
