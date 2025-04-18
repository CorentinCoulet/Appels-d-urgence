import axios from 'axios';

const TEAM_SERVICE_URL = process.env.TEAM_SERVICE_URL || 'http://localhost:3002';

export const getAvailableTeam = async () => {
    try {
        const res = await axios.get(`${TEAM_SERVICE_URL}/api/teams/available`);
        return res.data;
    } catch (error) {
        throw new Error("Aucune équipe disponible.");
    }
};

export const releaseTeam = async (teamId) => {
    try {
        const res = await axios.patch(`${TEAM_SERVICE_URL}/api/teams/${teamId}`, {
            availability: true
        });
        return res.data;
    } catch (error) {
        throw new Error("Erreur lors de la libération de l'équipe.");
    }
};

export const getTeamById = async (teamId) => {
    try {
        const res = await axios.get(`${TEAM_SERVICE_URL}/api/teams/${teamId}`);
        return res.data;
    } catch (error) {
        throw new Error("Équipe introuvable.");
    }
};