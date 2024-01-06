const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await db.Pharmacy.findAll();
}

async function getById(id) {
    return await getPharmacy(id);
}

async function create(params) {
    // validate
    if (await db.Pharmacy.findOne({ where: { name: params.name } })) {
        throw 'Name "' + params.name + '" is already taken';
    }

    await db.Pharmacy.create(params);
}

async function update(id, params) {
    const pharmacy = await getPharmacy(id);

    // validate
    const nameChanged = params.name && pharmacy.name !== params.name;
    if (nameChanged && await db.Pharmacy.findOne({ where: { name: params.name } })) {
        throw 'Name "' + params.name + '" is already taken';
    }

    Object.assign(pharmacy, params);
    await pharmacy.save();

    return pharmacy.get();
}

async function _delete(id) {
    const pharmacy = await getPharmacy(id);
    await pharmacy.destroy();
}

// helper functions

async function getPharmacy(id) {
    const pharmacy = await db.Pharmacy.findByPk(id);
    if (!pharmacy) throw 'Pharmacy not found';
    return pharmacy;
}
