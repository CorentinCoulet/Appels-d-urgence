export const validateIncidentCreation = (data) => {
    const requiredFields = ['description', 'localisation', 'callerId', 'operatorId'];
    for (const field of requiredFields) {
        if (!data[field] || typeof data[field] !== 'string') {
            return `Le champ ${field} est requis et doit être une chaîne.`;
        }
    }
    return null;
};