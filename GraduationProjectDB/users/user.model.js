const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        userName: { type: DataTypes.STRING, allowNull: false },
        userRole: { type: DataTypes.STRING, allowNull: false },
        userPharmacy: { type: DataTypes.STRING, allowNull: true },
        hash: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        },
            timestamps: false
    };

    return sequelize.define('User', attributes, options,
    );
}