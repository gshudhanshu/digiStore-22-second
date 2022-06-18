import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/Barbados')

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc Create new order
// @route POST /api/orders
// @access Private
const placeOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    // shippingAddress,
    // paymentMethod,
    itemsPrice,
    // taxPrice,
    // shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const user = await User.findById(req.user._id).select(
      '-password -isAdmin -planDetails'
    )

    let productList = []

    for (let x = 0; x < orderItems.length; x++) {
      let p = await Product.findById(orderItems[x].product)
      productList.push(p)
    }

    for (let i = 0; i < orderItems.length; i++) {
      if (orderItems[i].qty > productList[i].countInStock) {
        res.status(400)
        throw new Error(
          `We have ${productList[i].countInStock} qty of "${productList[i].name}". It is not enough to fulfill the order. Please reduce the quantity`
        )
      }
    }

    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

    if (user.digiDollas < totalPrice) {
      res.status(404)
      throw new Error("You don't have enough DigiDollas")
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      // shippingAddress,
      // paymentMethod,
      itemsPrice,
      // taxPrice,
      // shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    user.digiDollas = user.digiDollas - Number(totalPrice)
    await user.save()

    for (let y = 0; y < orderItems.length; y++) {
      productList[y].countInStock -= orderItems[y].qty
      await productList[y].save()
    }

    // for (let i = 0; i < orderItems.length; i++) {
    //   let op = Product.findById(orderItems[i].product)
    //   op.countInStock -= orderItems[i].qty
    //   op.save()
    // }

    res.status(201).json({ createdOrder, user })
  }
})

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'fname lname full_mobile'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  let order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc Get all orders
// @route GET /api/orders
// @access Private/admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id fname lname')
  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  placeOrder,
}
