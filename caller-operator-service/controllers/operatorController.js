import { validateOperator } from '../dtos/operatorDto.js';
import * as repository from '../repositories/operatorRepository.js';

export const createOperator = async (req, res) => {
    const error = validateOperator(req.body);
    if (error) {
        return res.status(400).json({ error });
    }

    try {
        const newOperator = await repository.createOperator(req.body);
        res.status(201).json(newOperator);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllOperators = async (req, res) => {
    try {
        const operators = await repository.getAllOperators();
        res.status(200).json(operators);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getOperatorById = async (req, res) => {
    try {
        const operator = await repository.getOperatorById(req.params.id);
        if (!operator) {
            return res.status(404).json({ error: 'Opérateur inconnu' });
        }
        res.status(200).json(operator);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};