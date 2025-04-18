import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
    description: { type: String, required: true },
    localisation: { type: String, required: true },
    callerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Caller' },
    operatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Operator' },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    status: { type: String, enum: ['pending', 'in_progress', 'resolved'], default: 'pending' }
}, { timestamps: true });

const Incident = mongoose.model('Incident', incidentSchema);

export default Incident;