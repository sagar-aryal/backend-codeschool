import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Bootcamp from "./models/Bootcamp.js";
import Course from "./models/Course.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// load env vars
dotenv.config({ path: "./config/config.env" });

// connect to DB
const conn = await mongoose.connect(process.env.MONGO_URI);

// read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

// import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log("Data imported from DB");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// delete data from DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log("Data deleted from DB");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
