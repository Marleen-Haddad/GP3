const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        patientId: { type: DataTypes.STRING, allowNull: false },   
        description: { type: DataTypes.STRING, allowNull: false }, 
        medicineDescription: { type: DataTypes.STRING, allowNull: true } ,     
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

    return sequelize.define('PatinetDescription', attributes, options,
    );
}