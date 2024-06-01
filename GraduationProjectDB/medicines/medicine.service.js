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
    return await db.Medicine.findAll();
}

async function getById(id) {
    return await getMedicine(id);
}

async function create(params) {
    // validate
    if (await db.Medicine.findOne({ where: { name: params.name } })) {
        throw 'Name "' + params.name + '" is already taken';
    }

    await db.Medicine.create(params);
}

async function update(id, params) {
    const medicine = await getMedicine(id);

    // validate
    const nameChanged = params.name && medicine.name !== params.name;
    if (nameChanged && await db.Medicine.findOne({ where: { name: params.name } })) {
        throw 'Name "' + params.name + '" is already taken';
    }

    Object.assign(medicine, params);
    await medicine.save();

    return medicine.get();
}

async function _delete(id) {
    const medicine = await getMedicine(id);
    await medicine.destroy();
}

// helper functions

async function getMedicine(id) {
    const medicine = await db.Medicine.findByPk(id);
    if (!medicine) throw 'Medicine not found';
    return medicine;
}
