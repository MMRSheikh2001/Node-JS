const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user.model');

// One row per login. The login token carries this row's id, so:
//   - logout            = delete the row
//   - "log out everywhere" / password reset = delete all of a user's rows
// A token whose row is gone is rejected even if it hasn't expired yet.
const AuthSession = sequelize.define('AuthSession', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'auth_sessions',
    timestamps: true,
    updatedAt: false
});

// If a user is deleted, their sessions go with them.
AuthSession.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
User.hasMany(AuthSession, { foreignKey: 'userId', as: 'sessions', onDelete: 'CASCADE' });

module.exports = AuthSession;