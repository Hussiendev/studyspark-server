// config.js
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  logDir: path.resolve("./logs"), // logs folder
};
