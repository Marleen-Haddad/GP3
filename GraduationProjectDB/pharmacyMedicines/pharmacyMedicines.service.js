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
    return await db.PharmacyMedicines.findAll();
}

async function getById(id) {
    return await getPharmacyMedicine(id);
}

async function create(params) {

    if (await db.PharmacyMedicines.findOne({ where: { pharmacyBranchId: params.pharmacyBranchId, medicineId: params.medicineId } })) {
        throw 'Pharmacy Medicine is already exist';
    }

    await db.PharmacyMedicines.create(params);
}

async function update(id, params) {
    const pharmacyMedicine = await getPharmacyMedicine(id);

    const changed = (pharmacyMedicine.pharmacyBranchId && pharmacyMedicine.pharmacyBranchId !== params.pharmacyBranchId ) && (pharmacyMedicine.medicineId && pharmacyMedicine.medicineId !== params.medicineId)  ;

    if (changed && await db.PharmacyMedicines.findOne({ where: { pharmacyBranchId: params.pharmacyBranchId, medicineId: params.medicineId } })) {
        throw 'Pharmacy Medicine is already exist';
    }
    Object.assign(pharmacyMedicine, params);
    await pharmacyMedicine.save();

    return pharmacyMedicine.get();
}

async function _delete(id) {
    const pharmacyMedicine = await getPharmacyMedicine(id);
    await pharmacyMedicine.destroy();
}


async function getPharmacyMedicine(id) {
    const pharmacyMedicine = await db.PharmacyMedicines.findByPk(id);
    if (!pharmacyMedicine) throw 'Pharmacy Medicine not found';
    return pharmacyMedicine;
}
