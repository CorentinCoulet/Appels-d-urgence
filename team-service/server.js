import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import teamRoutes from './routes/teamRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.use('/api/teams', teamRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});