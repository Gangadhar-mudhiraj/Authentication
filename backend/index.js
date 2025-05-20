import express from "express";
import dotenv from "dotenv";
import connectDb from "./Config/Database.js";
import bodyParser from "body-parser";
import cors from "cors";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
import AuthRoutes from "./Routes/Auth.route.js";
import ProductRoutes from "./Routes/Product.route.js";

app.use("/auth", AuthRoutes);
app.use("/products", ProductRoutes);

// Health check route
app.get("/ping", (_, res) => {
    res.send("pong");
});

// Global Error Handler (optional, good for catching thrown errors)
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message || err,
    });
});

// Start Server
const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await connectDb(process.env.MONGODB_URL);
        console.log("✅ MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`🚀 Server listening on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1); // Exit process on failure
    }
};

startServer();
