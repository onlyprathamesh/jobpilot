const express = require("express");
const  {verifyToken} = require("../middlewares/authMiddleware");
const jobController = require("../controllers/jobControllers");
const { jobValidationRules, jobValidateRequest } = require("../middlewares/inputValidators/jobValidator");

const router = express.Router();

router.route('/job').post(verifyToken,jobValidationRules, jobValidateRequest, jobController.addJob);
router.route('/job').get(verifyToken, jobController.viewJobs);
router.route('/job/:id').delete(verifyToken, jobController.deleteJob);
router.route('/job/:id').put(verifyToken,jobValidationRules, jobValidateRequest, jobController.updateJob);

module.exports = router;