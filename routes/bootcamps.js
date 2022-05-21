import express from "express";
import {
  getBootcamps,
  createBootcamp,
  getBootcamp,
  putBootcamp,
  deleteBootcamp,
} from "../controllers/bootcamps.js";

const router = express.Router();

router.route("/").get(getBootcamps).post(createBootcamp);
router.route("/:id").get(getBootcamp).put(putBootcamp).delete(deleteBootcamp);

export default router;
