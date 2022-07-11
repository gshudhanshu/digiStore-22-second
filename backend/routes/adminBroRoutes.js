import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminJSMongoose from '@adminjs/mongoose'
AdminJS.registerAdapter(AdminJSMongoose)

import User from '../models/userModel.js'
import ScratchCard from '../models/scratchCardModel.js'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'

import express from 'express'

let router = express.Router()

const adminJs = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        listProperties: ['fname', 'lname', 'full_mobile', 'isAdmin'],
        properties: {
          full_mobile: { isTitle: true },
        },
      },
    },
    {
      resource: Product,
      options: {
        listProperties: [
          'name',
          'image',
          'brand',
          'category',
          'description',
          'price',
          'countInStock',
        ],
      },
    },
    {
      resource: Order,
      options: {
        listProperties: ['user', 'full_mobile', 'totalPrice', 'createdAt'],
        // properties: {
        //   user: { type: 'reference' },
        // },
      },
    },
    ScratchCard,
  ],

  rootPath: '/admin',

  branding: {
    companyName: 'DigiStore',
  },
  softwareBrothers: false,
  logo: false,
})

const ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
}
router = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'adminjs',
    cookiePassword: process.env.ADMIN_COOKIE_PASS || '#3AFZVzszQ+%kyE{',
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN
      }
      return null
    },
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET ?? 'sessionsecret',
  }
)

export default router
