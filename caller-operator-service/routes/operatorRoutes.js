import express from 'express';
import * as operatorController from '../controllers/operatorController.js';

const router = express.Router();

router.post('/', operatorController.createOperator);
router.get('/', operatorController.getAllOperators);
router.get('/:id', operatorController.getOperatorById);

export default router;