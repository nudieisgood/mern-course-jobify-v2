import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
  getJob,
} from "../controllers/jobController.js";

import { Router } from "express";
const router = Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/stats").get(showStats);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

export default router;
