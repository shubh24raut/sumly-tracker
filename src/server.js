import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.listen(env.port, () => {
  console.log(`Server running on port http://localhost:${env.port}`);
});
