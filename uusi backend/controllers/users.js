const router = require('express').Router()

const res = require('express/lib/response')
const { User } = require('../models/index')

router.get('/', async (request, response) => {
    const users = await User.findAll()
    response.json(users)
})

router.post('/', async (request, response) => {
    try {
        const newUser = await User.create(request.body)
        response.json(newUser)
    } catch (error) {
        return response.status(400).json({ error })
    }
})

module.exports = router