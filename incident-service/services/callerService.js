import axios from 'axios';

const CALLER_SERVICE_URL = process.env.CALLER_OPERATOR_SERVICE_URL || 'http://localhost:3001';

export const verifyCallerExists = async (callerId) => {
    try {
        const res = await axios.get(`${CALLER_SERVICE_URL}/api/callers/${callerId}`);
        return res.data;
    } catch (error) {
        throw new Error("L'appelant spécifié est introuvable.");
    }
};

export const verifyOperatorExists = async (operatorId) => {
    try {
        const res = await axios.get(`${CALLER_SERVICE_URL}/api/operators/${operatorId}`);
        return res.data;
    } catch (error) {
        throw new Error("L'opérateur spécifié est introuvable.");
    }
};