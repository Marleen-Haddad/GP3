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
    return await db.PatinetDescription.findAll();
}

async function getById(id) {
    return await getPatinetDescription(id);
}

async function create(params) {
    await db.PatinetDescription.create(params);
}

async function update(id, params) {
    const patinetDescription = await getPatinetDescription(id);

    Object.assign(patinetDescription, params);
    await patinetDescription.save();

    return patinetDescription.get();
}

async function _delete(id) {
    const patinetDescription = await getPatinetDescription(id);
    await patinetDescription.destroy();
}

// helper functions

async function getPatinetDescription(id) {
    const patinetDescription = await db.PatinetDescription.findByPk(id);
    if (!patinetDescription) throw 'Patinet Description not found';
    return patinetDescription;
}

