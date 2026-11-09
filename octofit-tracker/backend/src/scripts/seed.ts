import mongoose from 'mongoose';
import { connectionString } from '../config/database';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const ids = {
  teams: {
    trailblazers: new mongoose.Types.ObjectId('650000000000000000000001'),
    sunrise: new mongoose.Types.ObjectId('650000000000000000000002'),
  },
  users: {
    maya: new mongoose.Types.ObjectId('650000000000000000000011'),
    noah: new mongoose.Types.ObjectId('650000000000000000000012'),
    ava: new mongoose.Types.ObjectId('650000000000000000000013'),
    liam: new mongoose.Types.ObjectId('650000000000000000000014'),
  },
};

const periodStart = new Date('2026-11-01T00:00:00.000Z');
const periodEnd = new Date('2026-11-30T23:59:59.999Z');

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      Team.updateOne(
        { _id: ids.teams.trailblazers },
        {
          $set: {
            name: 'Trailblazers',
            description: 'A friendly team focused on running and outdoor adventures.',
          },
        },
        { upsert: true, runValidators: true },
      ),
      Team.updateOne(
        { _id: ids.teams.sunrise },
        {
          $set: {
            name: 'Sunrise Crew',
            description: 'Early risers building consistent, balanced fitness habits.',
          },
        },
        { upsert: true, runValidators: true },
      ),
    ]);

    const users = [
      {
        _id: ids.users.maya,
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        team: ids.teams.trailblazers,
        profile: { age: 29, fitnessLevel: 'intermediate', goals: ['run a 10K', 'stay active'] },
      },
      {
        _id: ids.users.noah,
        name: 'Noah Patel',
        email: 'noah.patel@example.com',
        team: ids.teams.trailblazers,
        profile: { age: 34, fitnessLevel: 'beginner', goals: ['walk daily', 'build endurance'] },
      },
      {
        _id: ids.users.ava,
        name: 'Ava Johnson',
        email: 'ava.johnson@example.com',
        team: ids.teams.sunrise,
        profile: { age: 27, fitnessLevel: 'advanced', goals: ['improve pace', 'cross-train'] },
      },
      {
        _id: ids.users.liam,
        name: 'Liam Garcia',
        email: 'liam.garcia@example.com',
        team: ids.teams.sunrise,
        profile: { age: 31, fitnessLevel: 'intermediate', goals: ['cycle weekly', 'get stronger'] },
      },
    ];

    await Promise.all(
      users.map(({ _id, ...user }) =>
        User.updateOne({ _id }, { $set: user }, { upsert: true, runValidators: true }),
      ),
    );

    await Promise.all([
      Team.updateOne(
        { _id: ids.teams.trailblazers },
        { $set: { members: [ids.users.maya, ids.users.noah] } },
        { runValidators: true },
      ),
      Team.updateOne(
        { _id: ids.teams.sunrise },
        { $set: { members: [ids.users.ava, ids.users.liam] } },
        { runValidators: true },
      ),
    ]);

    const activities = [
      { _id: '650000000000000000000021', user: ids.users.maya, type: 'run', durationMinutes: 42, distanceKm: 7.2, calories: 410, date: '2026-11-07T08:15:00.000Z' },
      { _id: '650000000000000000000022', user: ids.users.noah, type: 'walk', durationMinutes: 35, distanceKm: 2.8, calories: 165, date: '2026-11-07T07:30:00.000Z' },
      { _id: '650000000000000000000023', user: ids.users.ava, type: 'cycle', durationMinutes: 55, distanceKm: 21.5, calories: 520, date: '2026-11-06T06:45:00.000Z' },
      { _id: '650000000000000000000024', user: ids.users.liam, type: 'strength', durationMinutes: 40, calories: 290, date: '2026-11-06T07:10:00.000Z' },
    ];

    await Promise.all(
      activities.map(({ _id, ...activity }) =>
        Activity.updateOne(
          { _id: new mongoose.Types.ObjectId(_id) },
          { $set: { ...activity, date: new Date(activity.date) } },
          { upsert: true, runValidators: true },
        ),
      ),
    );

    const leaderboardEntries = [
      { user: ids.users.ava, team: ids.teams.sunrise, points: 520, activityCount: 8, rank: 1 },
      { user: ids.users.maya, team: ids.teams.trailblazers, points: 410, activityCount: 7, rank: 2 },
      { user: ids.users.liam, team: ids.teams.sunrise, points: 290, activityCount: 5, rank: 3 },
      { user: ids.users.noah, team: ids.teams.trailblazers, points: 165, activityCount: 4, rank: 4 },
    ];

    await Promise.all(
      leaderboardEntries.map((entry) =>
        Leaderboard.updateOne(
          { user: entry.user, periodStart },
          { $set: { ...entry, periodStart, periodEnd } },
          { upsert: true, runValidators: true },
        ),
      ),
    );

    const workouts = [
      {
        _id: '650000000000000000000031',
        name: 'Beginner Walk and Mobility',
        description: 'A gentle session to build a daily movement habit.',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: [
          { name: 'Brisk walk', durationMinutes: 15 },
          { name: 'Standing stretches', durationMinutes: 10 },
        ],
      },
      {
        _id: '650000000000000000000032',
        name: 'Steady 5K Builder',
        description: 'A conversational-paced run with a short warm-up and cool-down.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: [
          { name: 'Easy warm-up jog', durationMinutes: 8 },
          { name: 'Steady run', durationMinutes: 25 },
          { name: 'Cool-down walk', durationMinutes: 7 },
        ],
      },
      {
        _id: '650000000000000000000033',
        name: 'Full Body Strength',
        description: 'A balanced bodyweight routine for strength and stability.',
        difficulty: 'intermediate',
        durationMinutes: 30,
        exercises: [
          { name: 'Squats', repetitions: 12 },
          { name: 'Push-ups', repetitions: 10 },
          { name: 'Plank', durationMinutes: 1 },
        ],
      },
      {
        _id: '650000000000000000000034',
        name: 'Advanced Tempo Intervals',
        description: 'A challenging tempo session to develop running speed.',
        difficulty: 'advanced',
        durationMinutes: 45,
        exercises: [
          { name: 'Warm-up jog', durationMinutes: 10 },
          { name: 'Tempo intervals', durationMinutes: 25 },
          { name: 'Cool-down jog', durationMinutes: 10 },
        ],
      },
    ];

    await Promise.all(
      workouts.map(({ _id, ...workout }) =>
        Workout.updateOne(
          { _id: new mongoose.Types.ObjectId(_id) },
          { $set: workout },
          { upsert: true, runValidators: true },
        ),
      ),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
