export const validateTeam = (data) => {
    if (!data.type || typeof data.type !== 'string') {
        return 'Le type d’équipe est requis et doit être une chaîne de caractères valides.';
    }
    return null;
};