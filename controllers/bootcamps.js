import Bootcamp from "../models/Bootcamp.js";
import customError from "../utils/customError.js";

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public

export const getBootcamps = async (req, res, next) => {
  // res.status(200).json({ success: true, message: "Show all bootcamps" });
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public

export const getBootcamp = async (req, res, next) => {
  /*  res.status(200).json({
    success: true,
    message: `Get Single bootcamp of Id ${req.params.id}`,
  }); */
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new customError(`Resource not found with id of ${err.value}`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    // res.status(400).json({ success: false });
    next(err);
  }
};

// @desc    Create a new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private

export const createBootcamp = async (req, res, next) => {
  // console.log(req.body);
  // res.status(200).json({ success: true, message: "Create new bootcamp" });

  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private

export const putBootcamp = async (req, res, next) => {
  /* res
    .status(200)
    .json({ success: true, message: `Update bootcamp ${req.params.id}` }); */
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bootcamp) {
      return next(
        new customError(`Resource not found with id of ${err.value}`, 404)
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private

export const deleteBootcamp = async (req, res, next) => {
  /*  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` }); */
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return next(
        new customError(`Resource not found with id of ${err.value}`, 404)
      );
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
