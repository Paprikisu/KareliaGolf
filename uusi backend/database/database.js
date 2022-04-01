const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {

    dialectOptions: {
        ssl: {
            require:false,
            rejectUnauthorized: false
        }
    },
});

const databaseConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection to db successful')
    } catch (error) {
        console.log('Connection to db failed')
        return process.exit(1)
    }

    return null
}

module.exports = { databaseConnection, sequelize }