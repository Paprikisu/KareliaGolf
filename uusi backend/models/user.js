const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../database/database')

//User model
class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    underscored: false,
    timestamps: false,
    modelName: 'user'
})

User.sync

module.exports = User