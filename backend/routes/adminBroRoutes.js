import AdminBro from 'admin-bro'
import AdminBroExpress from 'admin-bro-expressjs'

import express from 'express'

let router = express.Router()
router.use((req, res, next) => {
  if (req.session && req.session.admin) {
    req.session.adminUser = req.session.admin
    next()
  } else {
    res.redirect(adminBro.options.loginPath)
  }
})
router = AdminBroExpress.buildRouter(adminBro, router)

export default router

// export default router
