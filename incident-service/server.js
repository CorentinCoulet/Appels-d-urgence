import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import incidentRoutes from './routes/incidentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/incidents', incidentRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});