import express from 'express'
const router = express.Router()

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  placeOrder,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddlware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/neworder').post(protect, placeOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
