import express from "express";
import userRoute from "./routes/user";
import postRoute from "./routes/postRoutes";
import commentRoute from "./routes/commentRoute";
import { connection } from "./database/connection";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// middleware
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// await connection to database
async function connettodb() {
  await connection();
}

// routes
app.use("/auth", userRoute);
app.use("/posts", postRoute);
app.use("/posts", commentRoute);

app.get("/", (req, res) => {
  res.send("<h1>Hello, There!</h1>");
});

app.listen(process.env.PORT!, () => {
  // Connect to the database after starting the server
  connettodb();
  console.log("app on port ", process.env.PORT);
});
