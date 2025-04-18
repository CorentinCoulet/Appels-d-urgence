import { validateTeam } from '../dtos/teamDto.js';
import * as repository from '../repositories/teamRepository.js';

export const createTeam = async (req, res) => {
    const error = validateTeam(req.body);
    if (error) {
        return res.status(400).json({ error });
    }

    try {
        const newTeam = await repository.createTeam(req.body);
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllTeams = async (req, res) => {
    try {
        const teams = await repository.getAllTeams();
        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAvailableTeam = async (req, res) => {
    try {
        const team = await repository.getAvailableTeam();
        if (!team) {
            return res.status(404).json({ error: 'Aucune équipe disponible' });
        }
        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTeamAvailability = async (req, res) => {
    try {
        const team = await repository.updateTeamAvailability(req.params.id, req.body.availability);
        if (!team) {
            return res.status(404).json({ error: 'Équipe inconnue' });
        }
        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getTeamById = async (req, res) => {
    try {
        const team = await repository.getTeamById(req.params.id);

        if (!team) {
            return res.status(404).json({ error: 'Équipe introuvable' });
        }

        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
