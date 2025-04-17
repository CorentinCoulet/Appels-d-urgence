import mongoose from 'mongoose';

const operatorSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const Operator = mongoose.model('Operator', operatorSchema);

export default Operator;