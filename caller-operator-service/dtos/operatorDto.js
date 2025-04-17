export const validateOperator = (data) => {
    if (!data.name || typeof data.name !== 'string') {
        return 'Le nom de l’opérateur est requis et doit être une chaîne de caractères valides.';
    }
    return null;
};
