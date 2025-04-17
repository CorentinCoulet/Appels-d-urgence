import mongoose from 'mongoose';

const callerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true }
});

const Caller = mongoose.model('Caller', callerSchema);

export default Caller;