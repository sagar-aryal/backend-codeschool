import express from "express";
import dotenv from "dotenv";

import bootcamps from "./routes/bootcamps.js";

// Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

const port = process.env.PORT || 5000;

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
