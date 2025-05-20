import mongoose from "mongoose";

const connectDb = async (url) => {
    await mongoose.connect(url).then(() => {
        console.log("connected to database");
    }).catch((err) => {
        console.log("connection failed", err);
    })
}


export default connectDb;