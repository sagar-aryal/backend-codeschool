import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import bootcamps from "./routes/bootcamps.js";
import { logger } from "./middleware/logger.js";
import connectDB from "./config/db.js";

// Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Logging middleware
// app.use(logger);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
