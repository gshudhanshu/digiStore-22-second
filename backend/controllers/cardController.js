import User from '../models/userModel.js'
import ScratchCard from '../models/scratchCardModel.js'
import StaffScratchCard from '../models/staffScratchCardModel.js'
import asyncHandler from 'express-async-handler'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import Product from '../models/productModel.js'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/Barbados')

// ScratchCARD routes

// @desc Generate scratch card points
// @route POST /api/users/:id/cards
// @access Private
const generateScratchCard = asyncHandler(async (req, res) => {
  let userID, full_mobile, receiptImg
  if (req.body.hasOwnProperty('user') && req.body.user.isStaff) {
    let { mobile } = req.body

    let errors = []
    mobile = Number(mobile)
    let mobileStr = mobile.toString()
    if (
      !mobile ||
      typeof mobile !== 'number' ||
      (mobileStr.length !== 7 && mobileStr.length !== 11)
    ) {
      errors.push({ msg: 'Please enter correct mobile number' })
    }

    if (mobileStr.length === 7) {
      full_mobile = '+1246' + mobile
    } else if (mobileStr.length === 11) {
      full_mobile = '+' + mobile
    } else {
      errors.push({ msg: 'Please enter correct mobile number' })
    }

    if (errors.length > 0) {
      res.status(401)
      throw new Error('Invalid mobile number or password')
    }

    userID = req.body.user._id
    receiptImg = req.body.image
  } else {
    userID = req.body._id
  }

  let user = await User.findById(userID)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  // const todayDate = dayjs(Date.now())
  // const lastScratchDate = user.lastScratchDate
  const todayDate = dayjs.tz(Date.now()).format('YYYYMMDD')
  const lastScratchDate = dayjs.tz(user.lastScratchDate).format('YYYYMMDD')

  if (lastScratchDate === todayDate && !user.isStaff) {
    return res.status(200).json({
      status: 'fail',
      lastScratchDate,
    })
  }

  let days,
    min,
    max,
    randomNum,
    expiryDate = 0

  if (user.isStaff) {
    const filter = { isStaff: true, countInStock: { $gt: 0 } }
    const randomProduct = await Product.aggregate().match(filter).sample(1)
    return res.json({
      status: 'success',
      product: randomProduct[0],
      full_mobile,
      receiptImg,
      todayDate,
    })
  } else {
    switch (user.planDetails.plan) {
      case 'Prime 7D':
      case 'Prime 7D Data Only':
        days = 7
        min = 4
        max = 8
        break
      case 'Prime MDA 14D':
      case 'Prime MDA 14D Data Only':
        days = 14
        min = 6
        max = 10
        break
      case 'Prime MDA 30D':
      case 'Prime MDA 30D 6.5GB Data Only':
        days = 30
        min = 8
        max = 12
        break
      default:
        days = 0
        min = 1
        max = 2
    }
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    expiryDate = await dayjs(user.planDetails.purchaseDate, 'YYYYMMDD').add(
      days,
      'day'
    )
    return res.json({
      status: 'success',
      digiDollas: randomNum,
      expiryDate,
      todayDate,
    })
  }

  return res.status(200).json({
    status: 'fail',
    lastScratchDate,
  })
})

// @desc Save scratch card points
// @route PUT /api/users/:id/cards
// @access Private
const saveScratchedCard = asyncHandler(async (req, res) => {
  const { cardDetails, isStaff } = req.body
  const user = await User.findById(req.user._id).select(
    '-password -isAdmin -createdAt -updatedAt -planDetails'
  )
  if (!isStaff) {
    if (!cardDetails && typeof cardDetails.digiDollas !== 'number') {
      res.status(400)
      throw new Error('Invalid scratch card details')
    }

    let scratchCard
    if (!user) {
      res.status(404)
      throw new Error('User not found')
    } else {
      scratchCard = {
        digiDollas: cardDetails.digiDollas,
        scratchDate: Date.now(),
        user: req.user._id,
      }

      user.digiDollas += cardDetails.digiDollas
      user.lastScratchDate = scratchCard.scratchDate
      await user.save()
    }

    await ScratchCard.create(scratchCard)

    res.status(202).json({
      user,
      cardDetails,
      message: 'DigiDollas is added to total',
      status: 'success',
    })
  } else {
    let staffScratchCard = {
      scratchDate: Date.now(),
      user: req.user._id,
      full_mobile: req.body.cardDetails.full_mobile,
      receiptImg: req.body.cardDetails.receiptImg,
      product: req.body.cardDetails.product._id,
    }
    await StaffScratchCard.create(staffScratchCard)
    res.status(202).json({
      user,
      cardDetails,
      message: 'DigiDollas is added to total',
      status: 'success',
    })
  }
})

// @desc Get logged in user cards
// @route GET /api/users/mycards
// @access Private
const getMyCards = asyncHandler(async (req, res) => {
  let cards = await ScratchCard.find({ user: req.user._id }).select('-user')
  cards.map((card) => dayjs(card.scratchDate))
  res.json(cards)
})

export { getMyCards, generateScratchCard, saveScratchedCard }
