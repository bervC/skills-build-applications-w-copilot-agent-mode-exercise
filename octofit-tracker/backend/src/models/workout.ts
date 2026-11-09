import { model, models, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [
      {
        name: { type: String, required: true, trim: true },
        durationMinutes: { type: Number, min: 1 },
        repetitions: { type: Number, min: 1 },
      },
    ],
  },
  { timestamps: true },
);

export default models.Workout || model('Workout', workoutSchema);
