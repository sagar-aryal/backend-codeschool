import Bootcamp from "../models/Bootcamp.js";
import customError from "../utils/customError.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public

export const getBootcamps = asyncHandler(async (req, res, next) => {
  let query = req.query;

  // copy or req.query
  const reqQuery = { ...query };

  // fields to exclude
  const removeField = ["select", "sort", "page", "limit"];

  // loop over removeField and delete field from reqQuery
  removeField.forEach((field) => delete reqQuery[field]);
  // console.log(reqQuery);

  // find resource
  query = Bootcamp.find(query).populate("courses");

  // select
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    // console.log(fields);
    query = query.select(fields);
  }

  // sort
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.sort(fields);
  } else {
    query = query.sort({ name: 1 });
  }

  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // execute query
  const bootcamps = await query;

  // pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
});

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public

export const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new customError(`Resource not found with id of ${err.value}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});
// @desc    Create a new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private

export const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private

export const putBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!bootcamp) {
    return next(
      new customError(`Resource not found with id of ${err.value}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private

export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  // const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  // if we use cascade delete functionality findByIdAndDelete will not work! instead we have to use findById and use remove() method.
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new customError(`Resource not found with id of ${err.value}`, 404)
    );
  }

  bootcamp.remove();
  res.status(200).json({ success: true, data: {} });
});
