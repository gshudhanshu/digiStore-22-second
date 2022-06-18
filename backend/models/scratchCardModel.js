import mongoose from 'mongoose'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 7)

const scratchCardSchema = mongoose.Schema(
  {
    digiDollas: { type: Number, required: true },
    scratchDate: { type: Date, default: Date.now() },
    cardId: {
      type: String,
      default: nanoid(),
      unique: true,
    },
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
