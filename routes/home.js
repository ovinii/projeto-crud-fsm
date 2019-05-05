const express = require('express')

const homeRouter = () => {
    const router = express.Router()
    router.get('/', homeController.home)

    return router
}

module.exports = homeRouter