import Team from '../models/Team.js';

export const createTeam = async (data) => {
    return await Team.create(data);
};

export const getAllTeams = async () => {
    return await Team.find();
};

export const getAvailableTeam = async () => {
    return await Team.findOne({ availability: true });
};

export const updateTeamAvailability = async (id, availability) => {
    return await Team.findByIdAndUpdate(id, { availability }, { new: true });
};