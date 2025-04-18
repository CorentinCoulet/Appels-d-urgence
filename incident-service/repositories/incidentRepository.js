import Incident from '../models/Incident.js';
import { verifyCallerExists, verifyOperatorExists } from "../services/callerService.js";
import { getTeamById } from "../services/teamService.js";

export const getAllIncidents = async () => {
    const incidents = await Incident.find().lean();
    const fullIncidents = await Promise.all(
        incidents.map(async (incident) => {
            const [caller, operator, team] = await Promise.all([
                verifyCallerExists(incident.callerId),
                verifyOperatorExists(incident.operatorId),
                getTeamById(incident.teamId)
            ]);

            return {
                ...incident,
                caller,
                operator,
                team
            };
        })
    );
    return fullIncidents;
};

export const createIncident = async (data) => Incident.create(data);
export const updateIncidentStatus = async (id, status) => Incident.findByIdAndUpdate(id, { status }, { new: true });

