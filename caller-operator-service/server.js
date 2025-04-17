import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import callerRoutes from './routes/callerRoutes.js';
import operatorRoutes from './routes/operatorRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/callers', callerRoutes);
app.use('/api/operators', operatorRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});