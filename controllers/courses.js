import Course from "../models/Course.js";
import customError from "../utils/customError.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Get all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public

export const getCourses = asyncHandler(async (req, res, next) => {
  let query;
  console.log(req.params.bootcampId);
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }

  const courses = await query;
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public

export const getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new customError(`Resource not found with id of ${err.value}`, 404)
    );
  }
  res.status(200).json({ success: true, data: course });
});
// @desc    Create a new course
// @route   POST /api/v1/courses
// @access  Private

export const createCourse = asyncHandler(async (req, res, next) => {
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
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!course) {
    return next(
      new customError(`Resource not found with id of ${err.value}`, 404)
    );
  }

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
  res.status(200).json({ success: true, data: {} });
});
