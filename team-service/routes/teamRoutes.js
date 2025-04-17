import express from 'express';
import * as teamController from '../controllers/teamController.js';

const router = express.Router();

router.post('/', teamController.createTeam);
router.get('/', teamController.getAllTeams);
router.get('/available', teamController.getAvailableTeam);
router.patch('/:id', teamController.updateTeamAvailability);

export default router;