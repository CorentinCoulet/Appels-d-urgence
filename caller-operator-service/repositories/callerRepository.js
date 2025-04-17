import Caller from '../models/Caller.js';

export const createCaller = async (data) => {
  return await Caller.create(data);
};

export const getAllCallers = async () => {
  return await Caller.find();
};

export const getCallerById = async (id) => {
  return await Caller.findById(id);
};