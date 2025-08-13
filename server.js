import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
//configure env
dotenv.config();

//es module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

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
