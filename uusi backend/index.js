const express = require('express')
const cors = require('cors')
const app = express()

const { PORT } = require('./database/config')
const { databaseConnection } = require('./database/database')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(express.json())
app.use(cors())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const start = async () => {
    await databaseConnection()
    app.listen(PORT, () => {
        console.log("Palvelin pyörii")
    })
}

start()
