import mongoose from 'mongoose'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 7)

const staffScratchCardSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    receiptImg: {
      type: String,
      required: true,
    },
    full_mobile: {
      type: String,
      required: true,
    },
    cardId: {
      type: String,
      default: nanoid(),
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

const StaffScratchCard = mongoose.model(
  'StaffScratchCard',
  staffScratchCardSchema
)

export default StaffScratchCard
