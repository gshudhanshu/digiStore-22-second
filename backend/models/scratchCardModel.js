import mongoose from 'mongoose'

const scratchCardSchema = mongoose.Schema(
  {
    digiDollas: { type: Number, required: true },
    Date: { type: Date, default: Date.now(), required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const ScrachCard = mongoose.model('ScrachCard', scratchCardSchema)

export default ScrachCard
