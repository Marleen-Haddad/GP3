const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const pharmacyMedicinesService = require('./pharmacyMedicines.service');

// routes
router.post('/create', createSchema, create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;


function createSchema(req, res, next) {
    const schema = Joi.object({
        medicineId: Joi.string().required(),
        pharmacyBranchId: Joi.string().required() ,
        quantity: Joi.number().required(),     
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    pharmacyMedicinesService.create(req.body)
        .then(() => res.json({ message: 'Creation successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    pharmacyMedicinesService.getAll()
        .then(pharmacyMedicines => res.json(pharmacyMedicines))
        .catch(next);
}



function getById(req, res, next) {
    pharmacyMedicinesService.getById(req.params.id)
        .then(pharmacyMedicines=> res.json(pharmacyMedicines))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        medicineId: Joi.string().empty(''),
        pharmacyBranchId: Joi.string().empty('') ,
        quantity: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    pharmacyMedicinesService.update(req.params.id, req.body)
        .then(pharmacyMedicines=> res.json(pharmacyMedicines))
        .catch(next);
}

function _delete(req, res, next) {
    pharmacyMedicinesService.delete(req.params.id)
        .then(() => res.json({ message: 'Medicine deleted successfully' }))
        .catch(next);
}