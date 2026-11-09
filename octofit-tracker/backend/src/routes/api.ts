import { Router } from 'express';
import mongoose from 'mongoose';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const apiRouter = Router();

apiRouter.use((_request, response, next) => {
  if (mongoose.connection.readyState !== 1) {
    response.status(503).json({ error: 'Database unavailable' });
    return;
  }
  next();
});

apiRouter.get('/users/', async (_request, response) => {
  response.json(await User.find().populate('team').sort({ name: 1 }).lean());
});

apiRouter.get('/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').sort({ name: 1 }).lean());
});

apiRouter.get('/activities/', async (_request, response) => {
  response.json(
    await Activity.find().populate('user', 'name email').sort({ date: -1 }).lean(),
  );
});

apiRouter.get('/leaderboard/', async (_request, response) => {
  response.json(
    await Leaderboard.find()
      .populate('user', 'name email')
      .populate('team', 'name')
      .sort({ points: -1, rank: 1 })
      .lean(),
  );
});

apiRouter.get('/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ name: 1 }).lean());
});

export default apiRouter;
