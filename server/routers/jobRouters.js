const express = require("express");
const  {verifyToken} = require("../middlewares/authMiddleware");

const router = express.Router();

const jobController = require("../controllers/jobControllers")

router.route('/job').post(verifyToken, jobController.addJob);
router.route('/job').get(verifyToken, jobController.viewJobs);
router.route('/job/:id').delete(verifyToken, jobController.deleteJob);
router.route('/job/:id').put(verifyToken, jobController.updateJob);

module.exports = router;