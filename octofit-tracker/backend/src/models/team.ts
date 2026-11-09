import { model, models, Schema, Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export default models.Team || model('Team', teamSchema);
