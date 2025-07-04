const Job = require("../models/jobModel");

const addJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).send({ msg: "Job created." });
    console.log("Job Created", job);
  } catch (error) {
    res.status(500).send({ msg: "Error adding job.", error: error.message });
    console.log("Error adding Job: ", error.message);
  }
};

const viewJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).send({ msg: "Jobs Fetched.", jobs: jobs });
    console.log("Jobs Fetched.");
  } catch (error) {
    res.status(500).send({ msg: "Error viewing jobs.", error: error.message });
    console.log("Error viewing jobs.", error.message);
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ msg: "Job Id is required in URL." });
    }

    const deleteJob = await Job.findByIdAndDelete(id);

    if (!deleteJob) {
      return res.status(404).send({ msg: "Job not found." });
    }

    res.status(200).send({ msg: "Job deleted.", deleteJob });
    console.log("Job deleted.");
  } catch (error) {
    res.status(500).send({ msg: "Error deleting job.", error: error.message });
    console.log("Error deleting job.", error.message);
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ msg: "Job Id is required in URL." });
    }

    const updateJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateJob) {
      return res.status(404).send({ msg: "Job not found." });
    }
    res.status(200).send({ msg: "Job updated successfully.", updateJob });
    console.log("Job updated.");
  } catch (error) {
    res.status(500).send({ msg: "Error Updating job.", error: error.message });
    console.log("Error Updating job.", error.message);
  }
};

module.exports = { addJob, viewJobs, deleteJob, updateJob };
