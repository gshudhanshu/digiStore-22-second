import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'

import AdminJSMongoose from '@adminjs/mongoose'
AdminJS.registerAdapter(AdminJSMongoose)

import User from '../models/userModel.js'
import ScrachCard from '../models/scratchCardModel.js'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'

import express from 'express'

let router = express.Router()

const adminJs = new AdminJS({
  resources: [
    {
      resource: User,
      options: { listProperties: ['fname', 'lname', 'full_mobile', 'isAdmin'] },
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
    Order,
    //   {
    //     resource: Order,
    //   //   options: {
    //   //     listProperties: [
    //   //       'user.full_mobile',
    //   //       // 'lname',
    //   //       // 'full_mobile',
    //   //       'totalPrice',
    //   //       'createdAt',
    //   //     ],
    //   //   },
    //   // },
    //   ScrachCard,
  ],

  rootPath: '/adminbro',

  branding: {
    companyName: 'DigiStore',
  },
  softwareBrothers: false,
  logo: false,
})

router = AdminJSExpress.buildRouter(adminJs)

export default router

// export default router
