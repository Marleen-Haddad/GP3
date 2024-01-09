const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        descriptionId: { type: DataTypes.STRING, allowNull: false },
        pharmacyMedicinesId : { type: DataTypes.STRING, allowNull: false },
        insuranceAccept: { type: DataTypes.BOOLEAN, allowNull: false },
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

    return sequelize.define('PatinetMedicines', attributes, options,
    );
}