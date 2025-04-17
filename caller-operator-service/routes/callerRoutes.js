import express from 'express';
import * as callerController from '../controllers/callerController.js';

const router = express.Router();

router.post('/', callerController.createCaller);
router.get('/', callerController.getAllCallers);
router.get('/:id', callerController.getCallerById);

export default router;