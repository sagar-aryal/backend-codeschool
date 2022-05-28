import Course from "../models/Course.js";
import customError from "../utils/customError.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Bootcamp from "../models/Bootcamp.js";

// @desc    Get all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public

export const getCourses = asyncHandler(async (req, res, next) => {
  let query;
  // console.log(req.params.bootcampId);
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public

export const getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(
      new customError(`Resource not found with id of ${err.value}`, 404)
    );
  }
  res.status(200).json({ success: true, data: course });
});
// @desc    Create a new course
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private

export const createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new customError(`No bootcamp with the id of ${req.params.bootcampId}`)
    );
  }

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    data: course,
  });
});

// @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Private

export const putCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new customError(`No course found with the id of ${req.params.id}`, 404)
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: course });
});

// @desc    Delete course
// @route   DELETE /api/v1/courses/:id
// @access  Private

export const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    return next(
      new customError(`Resource not found with id of ${err.value}`, 404)
    );
  }

  await course.remove();

  res.status(200).json({ success: true, data: {} });
});
