const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getByDescriptionId,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await db.PatinetMedicines.findAll();
}

async function getByDescriptionId(descriptionId) {
    return await getPatinetMedicines(descriptionId);
}

async function create(params) {
    await db.PatinetMedicines.create(params);
}

async function update(id, params) {
    const patinetMedicines = await getPatinetMedicine(id);

    Object.assign(patinetMedicines, params);
    await patinetMedicines.save();

    return patinetMedicines.get();
}

async function _delete(id) {
    const patinetMedicines = await getPatinetMedicine(id);
    await patinetMedicines.destroy();
}

async function getPatinetMedicine(id) {
    const patinetMedicine = await db.PatinetMedicines.findByPk(id);
    if (!patinetMedicine) throw 'Patinet Medicine not found';
    return patinetMedicine;
}
// helper functions

async function getPatinetMedicines(descriptionId) {
    const patinetMedicines = await db.PatinetMedicines.findAll({ where: { descriptionId: descriptionId } });
    if (!patinetMedicines) throw 'Patinet Medicine not found';
    return patinetMedicines;
}

