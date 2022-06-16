import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    full_mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    planDetails: {
      purchaseDate: { type: Date },
      plan: { type: String },
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// userSchema.methods.generateDigiDollas = async function (user) {
//   let days,
//     min,
//     max,
//     randomNum,
//     expiryDate = 0
//   switch (user.planDetails.plan) {
//     case 'Prime 7D':
//     case 'Prime 7D Data Only':
//       days = 7
//       min = 4
//       max = 8
//       break
//     case 'Prime MDA 14D':
//     case 'Prime MDA 14D Data Only':
//       days = 14
//       min = 10
//       max = 20
//       break
//     case 'Prime MDA 30D':
//     case 'Prime MDA 30D 6.5GB Data Only':
//       days = 30
//       min = 20
//       max = 40
//       break
//     default:
//       days = 0
//       min = 0
//       max = 1
//   }
//   randomNum = Math.floor(Math.random() * (max - min + 1)) + min
//   console.log(randomNum)

//   // expiryDate = await DateTime.fromFormat('2022/01/01', 'yyyy/MM/dd').plus(days)

//   return randomNum
// }

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
