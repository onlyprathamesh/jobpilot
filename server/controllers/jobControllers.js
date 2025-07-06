const Job = require("../models/jobModel");

const addJob = async (req, res, next) => {
  try {
    const jobData = {
      ...req.body,
      userId: req.user.id
    };
    const job = await Job.create(jobData);

    res.status(201).send({ msg: "Job created." });
    console.log("Job Created", job);
  } catch (error) {
    return next(error);
  }
};

const viewJobs = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const jobs = await Job.find({userId});
    res.status(200).send({ msg: "Jobs Fetched.", jobs: jobs });
    console.log("Jobs Fetched.");
  } catch (error) {
    return next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
      const error = new Error("Job Id is required in URL");
      error.status = 400;
      return next(error);
    }

    const deleteJob = await Job.findByIdAndDelete({_id: id, userId});

    if (!deleteJob) {
      const error = new Error("Job not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).send({ msg: "Job deleted.", deleteJob });
    console.log("Job deleted.");
  } catch (error) {
    return next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
      const error = new Error("Job Id is required in URL");
      error.status = 400;
      return next(error);
    }

    const job = await Job.findOne({_id: id, userId});
    if (!job) {
      const error = new Error("Unauthorized user");
      error.status = 400;
      return next(error);
    }

    const updateJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateJob) {
      const error = new Error("Job not found");
      error.status = 404;
      return next(error);
    }
    res.status(200).send({ msg: "Job updated successfully.", updateJob });
    console.log("Job updated.");
  } catch (error) {
    return next(error);
  }
};

module.exports = { addJob, viewJobs, deleteJob, updateJob };
