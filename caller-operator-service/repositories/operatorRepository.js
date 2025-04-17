import Operator from '../models/Operator.js';

export const createOperator = async (data) => {
    return await Operator.create(data);
};

export const getAllOperators = async () => {
    return await Operator.find();
};

export const getOperatorById = async (id) => {
    return await Operator.findById(id);
};