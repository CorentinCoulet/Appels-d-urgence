import { validateCaller } from '../dtos/callerDto.js';
import * as repository from '../repositories/callerRepository.js';

export const createCaller = async (req, res) => {
  const error = validateCaller(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const newCaller = await repository.createCaller(req.body);
    res.status(201).json(newCaller);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCallers = async (req, res) => {
  try {
    const callers = await repository.getAllCallers();
    res.status(200).json(callers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCallerById = async (req, res) => {
  try {
    const caller = await repository.getCallerById(req.params.id);
    if (!caller) {
      return res.status(404).json({ error: 'Usager inconnu' });
    }
    res.status(200).json(caller);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};