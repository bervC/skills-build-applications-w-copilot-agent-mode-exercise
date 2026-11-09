import { model, models, Schema, Types } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    team: { type: Types.ObjectId, ref: 'Team' },
    profile: {
      age: { type: Number, min: 13 },
      fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
      goals: [{ type: String, trim: true }],
    },
  },
  { timestamps: true },
);

export default models.User || model('User', userSchema);
