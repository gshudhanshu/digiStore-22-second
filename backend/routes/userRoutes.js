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
  forgetPassword,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddlware.js'

router.post('/send-otp', sendOtp)

router.route('/').post(registerUser).get(protect, admin, getUsers)

router.post('/login', authUser)
router.post('/forget-password', forgetPassword)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
