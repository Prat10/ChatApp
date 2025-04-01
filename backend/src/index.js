import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     // origin: "http://localhost:5173",
//     origin:"*",
//     credentials: true,
//   })
// );
app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin || '*'); // Dynamically allow all origins
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and authentication headers
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  // app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  // });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
