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
    return await db.PharmacyBranches.findAll();
}

async function getById(id) {
    return await getPharmacyBranch(id);
}

async function create(params) {
    // validate
    if (await db.PharmacyBranches.findOne({ where: { name: params.name  , pharmacyId: params.pharmacyId}})) {
        throw 'Name and branch is already taken';
    }

    await db.PharmacyBranches.create(params);
}

async function update(id, params) {
    const pharmacyBranch = await getPharmacyBranch(id);

    // validate
    const nameChanged = pharmacyBranch.name && pharmacyBranch.name !== params.name;

    if ( nameChanged && await db.PharmacyBranches.findOne({ where: { name: params.name  , pharmacyId: params.pharmacyId } })) {
        throw 'Name and branch is already taken';
    }

    Object.assign(pharmacyBranch, params);
    await pharmacyBranch.save();

    return pharmacyBranch.get();
}

async function _delete(id) {
    const pharmacyBranch = await getPharmacyBranch(id);
    await pharmacyBranch.destroy();
}


async function getPharmacyBranch(id) {
    const pharmacyBranch = await db.PharmacyBranches.findByPk(id);
    if (!pharmacyBranch) throw 'Pharmacy Branch not found';
    return pharmacyBranch;
}
