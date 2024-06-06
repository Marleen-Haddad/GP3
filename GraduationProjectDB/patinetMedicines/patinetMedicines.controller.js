const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const patinetMedicinesService = require('./patinetMedicines.service');

// routes
router.post('/create', createSchema, create);
router.get('/', authorize(), getAll);
router.get('/:descriptionId', authorize(), getByDescriptionId);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
module.exports = router;





function createSchema(req, res, next) {
    const schema = Joi.object({
        descriptionId: Joi.string().required(),
        pharmacyMedicinesId : Joi.string().required(),
        insuranceAccept: Joi.bool().required(),  
        medicinePrice: Joi.number().required(),
        insurancePrecentage: Joi.number().required(),    
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    patinetMedicinesService.create(req.body)
        .then(() => res.json({ message: 'Creation successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    patinetMedicinesService.getAll()
        .then(patinetMedicines => res.json(patinetMedicines))
        .catch(next);
}



function getByDescriptionId(req, res, next) {
    patinetMedicinesService.getByDescriptionId(req.params.descriptionId)
        .then(patinetMedicines => res.json(patinetMedicines))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        descriptionId: Joi.string().required(),
        pharmacyMedicinesId : Joi.string().required(),
        insuranceAccept: Joi.bool().required(),    
        medicinePrice: Joi.number().empty(''),
        insurancePrecentage: Joi.number().empty(''),  
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    patinetMedicinesService.update(req.params.id, req.body)
        .then(patinetMedicine => res.json(patinetMedicine))
        .catch(next);
}

function _delete(req, res, next) {
    patinetMedicinesService.delete(req.params.id)
        .then(() => res.json({ message: 'Patinet Description deleted successfully' }))
        .catch(next);
}