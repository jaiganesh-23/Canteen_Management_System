import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "./models/userModel.js";
import authRoutes from "./routes/authRoutes.js";
import canteenRoutes from "./routes/canteenRoutes.js";
import discountRoutes from "./routes/discountRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";

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

// Database connection middleware for serverless
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection error:".bgRed.white, error);
    res.status(503).json({
      success: false,
      message: "Database connection failed. Please try again later."
    });
  }
});

// Session middleware
app.use(session({ secret: process.env.PASSPORT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Google Auth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/sign-in" }),
  async (req, res) => {
    // Redirect to frontend with user info
    let user = await userModel.findOne({ email: req.user.email });
    let role = user ? user.role : null;
    res.redirect('https://canteen-management-system-lilac.vercel.app/complete-profile?email=' + encodeURIComponent(req.user.email) + '&name=' + encodeURIComponent(req.user.name) + '&role=' + encodeURIComponent(role));
  }
);

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/canteens", canteenRoutes);
app.use("/api/v1/discounts", discountRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/suppliers", supplierRoutes);

app.use(express.static(path.join(__dirname, "./frontend/dist")));

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/dist/index.html"));
});

// Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://canteen-management-system-lilac.vercel.app/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  let user = await userModel.findOne({ email: profile.emails[0].value });
  if (!user) {
    user = await userModel.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: "", // You can prompt for password later
      role: "" // Role can be set later
    });
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

//PORT
const PORT = process.env.PORT || 5173;

//Initialize server with database connection
const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();
    console.log("Database connected successfully".bgGreen.white);

    // Then start the server
    app.listen(PORT, () => {
      console.log(
        `Server Running on prod mode on port ${PORT}`.bgCyan
          .white
      );
    });
  } catch (error) {
    console.error("Failed to start server:".bgRed.white, error);
    process.exit(1);
  }
};

// Start the server
startServer();
