import { model, models, Schema, Types } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['walk', 'run', 'cycle', 'swim', 'strength'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

export default models.Activity || model('Activity', activitySchema);
