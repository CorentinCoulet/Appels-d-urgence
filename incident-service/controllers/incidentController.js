import { validateIncidentCreation } from '../dtos/createIncidentDto.js';
import { validateStatusUpdate } from '../dtos/updateIncidentStatusDto.js';
import * as repository from '../repositories/incidentRepository.js';
import { verifyCallerExists, verifyOperatorExists } from '../services/callerService.js';
import { getAvailableTeam, releaseTeam } from '../services/teamService.js';

export const createIncident = async (req, res) => {
    const error = validateIncidentCreation(req.body);
    if (error) return res.status(400).json({ error });

    try {
        await verifyCallerExists(req.body.callerId);
        await verifyOperatorExists(req.body.operatorId);
        const team = await getAvailableTeam();

        const incident = await repository.createIncident({
            ...req.body,
            teamId: team._id,
            status: 'pending'
        });

        await releaseTeam(team._id);

        res.status(201).json(incident);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllIncidents = async (req, res) => {
    try {
        const incidents = await repository.getAllIncidents();
        res.status(200).json(incidents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateIncidentStatus = async (req, res) => {
    const error = validateStatusUpdate(req.body);
    if (error) return res.status(400).json({ error });

    try {
        const updated = await repository.updateIncidentStatus(req.params.id, req.body.status);
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
