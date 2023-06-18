//node.js framework'ü
import express from "express";
//.env içerisindeki kodlara(şifrelere, tokenlere, adreslere) erişmek için kullanılır
import dotenv from "dotenv";
//mongoDB'ye bağlanmak amaçlı kullanılır
import mongoose from "mongoose";
//
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"

//nodejs
const app = express();

//.env içerisindeki verilere erişebilmek için
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB")
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB Disconnected")
})

app.use(cookieParser())
app.use(express.json())

//burası yönlendirme
app.use("/auth", authRoute)
app.use("/users", usersRoute)
app.use("/rooms", roomsRoute)
app.use("/hotels", hotelsRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

app.listen(5000, () => {
  connect();
  console.log("Connected to backend");
});
