import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
    description: { type: String, required: true },
    localisation: { type: String, required: true },
    callerId: { type: String, required: true },
    operatorId: { type: String, required: true },
    teamId: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in_progress', 'resolved'], default: 'pending' }
}, { timestamps: true });

const Incident = mongoose.model('Incident', incidentSchema);

export default Incident;