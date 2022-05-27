import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./config/db.js";
import bootcamps from "./routes/bootcamps.js";
import courses from "./routes/courses.js";
import { logger } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

// Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

const port = process.env.PORT || 5000;

// Global middlewares
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: false }));

// Connect to database
connectDB();

// Logging middleware
// app.use(logger);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

// Error Handler Middleware

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
