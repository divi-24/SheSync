import express from "express";
import {
  periodTrackingController,
  trackerDataController,
  waterUpdateController,
} from "../controllers/periodTrackingController.js";
import { clerkAuth } from "../middlewares/clerkMiddleware.js";

const route = express.Router();

route.post("/trackerdata", clerkAuth, trackerDataController);
route.get("/periodtracking/:userId", clerkAuth, periodTrackingController);
route.get("/waterupdate/:userId", clerkAuth, waterUpdateController);

export default route;
