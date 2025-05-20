import express from "express"
import dotenv from "dotenv"
import connectDb from "./Config/Database.js"
import bodyParser from "body-parser"
import cors from "cors"

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())


import AuthRoutes from "./Routes/Auth.route.js"
app.use("/auth", AuthRoutes);


import productRoutes from "./Routes/Product.route.js"
app.use("/products", productRoutes);

app.get("/ping", (_, res) => {
    res.send("pong")
})

app.listen(process.env.PORT || 8080, () => {
    try {
        console.log(`listening to port ${process.env.PORT}`);
        connectDb(process.env.MONGODB_URL)
    }
    catch (err) {
        console.log(err);
    }
}
)