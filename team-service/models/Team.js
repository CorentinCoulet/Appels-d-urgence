import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    type: { type: String, required: true },
    availability: { type: Boolean, default: true }
});

const Team = mongoose.model('Team', teamSchema);

export default Team;