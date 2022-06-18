import express from 'express'
const router = express.Router()
import {
  generateScratchCard,
  saveScratchedCard,
  getMyCards,
} from '../controllers/cardController.js'
import { protect, admin } from '../middleware/authMiddlware.js'

router
  .route('/')
  .post(protect, generateScratchCard)
  .put(protect, saveScratchedCard)

router.route('/mycards').get(protect, getMyCards)

export default router
