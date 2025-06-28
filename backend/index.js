import express from "express";
import dotenv from "dotenv";
import connectDb from "./Config/Database.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser"; // ✅ ADD THIS

dotenv.config();

const app = express();

// ✅ CORS Configuration
app.use(cors({
    origin: "http://localhost:5173" || process.env.FRONTEND_URL, // e.g., "https://your-frontend.vercel.app"
    credentials: true // ✅ Needed for cookies
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ For parsing cookies

// Routes
import AuthRoutes from "./Routes/Auth.route.js";
import ProductRoutes from "./Routes/Product.route.js";

app.use("/auth", AuthRoutes);
app.use("/products", ProductRoutes);

// Health Check
app.get("/ping", (_, res) => res.send("pong"));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message || err,
    });
});

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await connectDb(process.env.MONGODB_URL);
        console.log("✅ MongoDB connected successfully");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
};

startServer();
