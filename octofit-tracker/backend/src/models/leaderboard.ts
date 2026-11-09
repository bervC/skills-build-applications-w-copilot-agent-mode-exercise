import { model, models, Schema, Types } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    team: { type: Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    activityCount: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
  },
  { timestamps: true },
);

leaderboardSchema.index({ user: 1, periodStart: 1 }, { unique: true });

export default models.Leaderboard || model('Leaderboard', leaderboardSchema);
