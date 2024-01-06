const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ 
    host     : host,
    port     : port,
    user     : user,
    password : password,
    database : database});
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' }, { 
        define:{
            timestamps: false
        }
    });

    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
    db.Pharmacy = require('../pharmacies/pharmacy.model')(sequelize);
    db.PharmacyBranches = require('../pharmacyBranches/pharmacyBranches.model')(sequelize);
    db.Medicine = require('../medicines/medicine.model')(sequelize);
    db.PharmacyMedicines=require('../pharmacyMedicines/pharmacyMedicines.model')(sequelize);
    db.PatinetDescription=require('../patinetDescription/patinetDescription.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
}