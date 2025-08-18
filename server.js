import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
//configure env
dotenv.config();

//database config
connectDB();

//es module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

app.use(express.static(path.join(__dirname, "./frontend/dist")));

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/dist/index.html"));
});

//PORT
const PORT = process.env.PORT || 5173;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on prod mode on port ${PORT}`.bgCyan
      .white
  );
});
