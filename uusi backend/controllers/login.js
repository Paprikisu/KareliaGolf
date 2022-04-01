const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../database/config')
const User = require('../models/user')

router.post('/', async (request, response) => {
    console.log("POST done")
    console.log(request.body)

    const body = request.body

    const user = await User.findOne({

        where: {
            username: body.username
        }

    })
    if (user) { console.log("User found") }

    const passwordOk = body.password === user.password

    if(!(user && passwordOk)) {
        return response.status(401).json({
            error: 'Käyttäjätunnus tai salasana on väärä'
        })
    }

    const tokenUser = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(tokenUser, SECRET)

    response
        .status(200)
        .send({ token, username: user.username, email: user.email})

})

module.exports = router