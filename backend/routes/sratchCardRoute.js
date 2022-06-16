import express from 'express'
const router = express.Router()
import {
  generateScratchCard,
  saveScratchedCard,
} from '../controllers/scratchCardController.js'
import { protect, admin } from '../middleware/authMiddlware.js'

router
  .route('/')
  .get(protect, generateScratchCard)
  .post(protect, saveScratchedCard)

export default router
