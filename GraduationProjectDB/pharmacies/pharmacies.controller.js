const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const pharmacyService = require('./pharmacy.service');

// routes
router.post('/create', createSchema, create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;


function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required()       
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    pharmacyService.create(req.body)
        .then(() => res.json({ message: 'Creation successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    pharmacyService.getAll()
        .then(pharmacies => res.json(pharmacies))
        .catch(next);
}

function getById(req, res, next) {
    pharmacyService.getById(req.params.id)
        .then(pharmacy => res.json(pharmacy))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    pharmacyService.update(req.params.id, req.body)
        .then(pharmacy => res.json(pharmacy))
        .catch(next);
}

function _delete(req, res, next) {
    pharmacyService.delete(req.params.id)
        .then(() => res.json({ message: 'Pharmacy deleted successfully' }))
        .catch(next);
}