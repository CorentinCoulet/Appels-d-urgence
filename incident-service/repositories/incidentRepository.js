import Incident from '../models/Incident.js';

export const createIncident = async (data) => Incident.create(data);
export const getAllIncidents = async () => Incident.find();
export const updateIncidentStatus = async (id, status) => Incident.findByIdAndUpdate(id, { status }, { new: true });