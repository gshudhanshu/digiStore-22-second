import express from 'express'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  sendOtp,
  generateScratchCard,
  saveScratchedCard,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddlware.js'

router.post('/send-otp', sendOtp)

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

router
  .route('/:id/cards')
  .post(protect, generateScratchCard)
  .put(protect, saveScratchedCard)

export default router
