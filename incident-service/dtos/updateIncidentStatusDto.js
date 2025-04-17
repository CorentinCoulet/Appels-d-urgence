export const validateStatusUpdate = (data) => {
    const validStatuses = ['pending', 'in_progress', 'resolved'];
    if (!data.status || !validStatuses.includes(data.status)) {
        return 'Le statut est invalide. Valeurs autorisées : pending, in_progress, resolved.';
    }
    return null;
};
