import express from 'express';
import * as incidentController from '../controllers/incidentController.js';

const router = express.Router();

router.post('/', incidentController.createIncident);
router.get('/', incidentController.getAllIncidents);
router.patch('/:id/status', incidentController.updateIncidentStatus);

export default router;