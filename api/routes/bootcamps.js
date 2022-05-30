import express from "express";
import {
  getBootcamps,
  createBootcamp,
  getBootcamp,
  putBootcamp,
  deleteBootcamp,
  uploadBootcampPhoto,
} from "../controllers/bootcamps.js";

import courseRouter from "./courses.js";

const router = express.Router();

// routing into other routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootcamps).post(createBootcamp);
router.route("/:id").get(getBootcamp).put(putBootcamp).delete(deleteBootcamp);
router.route("/:id/photo").put(uploadBootcampPhoto);

export default router;
