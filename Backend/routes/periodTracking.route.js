import { Router } from 'express';

import {
  periodTrackingController,
  trackerDataController,
  waterUpdateController,
} from '../controllers/periodTracking.controller.js';
import { requireAuth } from '@clerk/express';

const periodTrackingRoutes = Router();

periodTrackingRoutes.post('/trackerdata', requireAuth(), trackerDataController);
periodTrackingRoutes.get('/periodtracking/:userId', requireAuth(), periodTrackingController);
periodTrackingRoutes.get('/waterupdate/:userId', requireAuth(), waterUpdateController);

export default periodTrackingRoutes;
