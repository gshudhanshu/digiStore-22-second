import User from '../models/userModel.js'
import ScrachCard from '../models/scratchCardModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from './utils/generateToken.js'

import twilio from 'twilio'
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { full_mobile, password } = req.body
  const user = await User.findOne({ full_mobile })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      full_mobile: user.full_mobile,
      digiDollas: user.digiDollas,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid mobile number or password')
  }
})

// @desc Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { fname, lname, mobile, full_mobile, password, password2, otp } =
    req.body
  const userExists = await User.findOne({ full_mobile })
  let isOtpVerified = false

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  } else {
    // client.verify
    //   .services(process.env.VERIFY_SERVICE_SID)
    //   .verificationChecks.create({ to: full_mobile, code: otp })
    //   .then((verification_check) => {
    //     isOtpVerified = verification_check.valid
    //   })
    isOtpVerified = true
  }

  if (isOtpVerified) {
    const user = await User.create({
      fname,
      lname,
      full_mobile,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        full_mobile: user.full_mobile,
        digiDollas: user.digiDollas,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }
})

// @desc Send OTP route
// @route POST /api/send-otp
// @access Private
const sendOtp = asyncHandler(async (req, res) => {
  const { fname, lname, mobile, full_mobile, password, password2, use } =
    req.body
  let errors = []
  console.log(req.body)
  if (!mobile || !full_mobile) {
    errors.push({ msg: 'Please enter mobile number' })
  } else {
    User.findOne({ full_mobile: full_mobile }).then((user) => {
      if (!user && use !== 'register') {
        errors.push({ msg: 'No account with that mobile exists' })
      }

      if (errors.length > 0) {
        return res.json({
          layout: false,
          errors,
          fname,
          lname,
          mobile,
          full_mobile,
          password,
          password2,
        })
      } else {
        client.verify
          .services(process.env.VERIFY_SERVICE_SID)
          .verifications.create({ to: full_mobile, channel: 'sms' })
          .then((verification) => {
            res.status(200).json({ verification })
          })
          .catch((error) => {
            res.status(400).json({ error })
          })

        res.send({ opt: 'sent' })
      }
    })
  }
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      full_mobile: user.full_mobile,
      digiDollas: user.digiDollas,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.fname = req.body.fname || user.fname
    user.lname = req.body.lname || user.lname
    // user.mobile = req.body.mobile || user.mobile
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      fname: updatedUser.fname,
      lname: updatedUser.lname,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get all users
// @route GET /api/users
// @access Private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.json(users)
})

// @desc Delete a users
// @route DELETE /api/users/:id
// @access Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: 'User Removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.fname = req.body.fname || user.fname
    user.lname = req.body.lname || user.lname
    user.full_mobile = req.body.full_mobile || user.full_mobile
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      fname: updatedUser.fname,
      lname: updatedUser.lname,
      digiDollas: user.digiDollas,
      full_mobile: updatedUser.full_mobile,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  sendOtp,
}
