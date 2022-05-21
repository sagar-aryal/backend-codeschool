import Bootcamp from "../models/Bootcamp.js";

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public

export const getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, message: "Show all bootcamps" });
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public

export const getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Get Single bootcamp of Id ${req.params.id}`,
  });
};

// @desc    Create a new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private

export const createBootcamp = async (req, res, next) => {
  console.log(req.body);
  // res.status(200).json({ success: true, message: "Create new bootcamp" });

  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private

export const putBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Update bootcamp ${req.params.id}` });
};

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private

export const deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
};
