const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user.model');

// One row per "forgot password" request. We store only a HASH of the secret
// that was emailed, never the secret itself, so even someone who can read the
// database can't use these rows to take over an account (the same reason
// passwords are hashed).
const PasswordResetToken = sequelize.define('PasswordResetToken', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tokenHash: {
        type: DataTypes.STRING(64), // SHA-256 as hex text
        allowNull: false,
        unique: 'password_reset_tokens_tokenHash_unique'
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'password_reset_tokens',
    timestamps: true,
    updatedAt: false
});

PasswordResetToken.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
User.hasMany(PasswordResetToken, { foreignKey: 'userId', as: 'resetTokens', onDelete: 'CASCADE' });

module.exports = PasswordResetToken;