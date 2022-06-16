import User from '../models/userModel.js'
import ScratchCard from '../models/scratchCardModel.js'
import asyncHandler from 'express-async-handler'
import { DateTime } from 'luxon'

// @desc Generate scratch card points
// @route POST /api/cards
// @access Private
const generateScratchCard = asyncHandler(async (req, res) => {
  // console.log(req.body)
  // const user = await User.findById(req.user._id)
  let user = await User.findOne({
    user: req.body._id,
  })

  let days,
    min,
    max,
    randomNum,
    expiryDate = 0
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
      min = 10
      max = 20
      break
    case 'Prime MDA 30D':
    case 'Prime MDA 30D 6.5GB Data Only':
      days = 30
      min = 20
      max = 40
      break
    default:
      days = 0
      min = 0
      max = 1
  }
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min
  expiryDate = await DateTime.fromFormat('20220101', 'yyyyMMdd').plus({ days })

  res.json({ digiDollas: randomNum, expiryDate })
})

// @desc Generate scratch card points
// @route POST /api/cards/:id
// @access Private
const saveScratchedCard = asyncHandler(async (req, res) => {
  const generateCardDetails = await User.find({ user: req.user._id }).res.json(
    generateCardDetails
  )
})

export { generateScratchCard, saveScratchedCard }
