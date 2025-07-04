const express = require("express");

const router = express.Router();

const jobController = require("../controllers/jobControllers")

router.route('/job').post(jobController.addJob);
router.route('/job').get(jobController.viewJobs);
router.route('/job/:id').delete(jobController.deleteJob);
router.route('/job/:id').put(jobController.updateJob);

module.exports = router;