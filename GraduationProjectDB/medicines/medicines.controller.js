const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const medicineService = require('./medicine.service');

// routes
router.post('/create', createSchema, create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;


function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required() ,   
        price: Joi.number().required() 
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    medicineService.create(req.body)
        .then(() => res.json({ message: 'Creation successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    medicineService.getAll()
        .then(pharmacies => res.json(pharmacies))
        .catch(next);
}

function getById(req, res, next) {
    medicineService.getById(req.params.id)
        .then(medicine => res.json(medicine))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        price: Joi.number().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    medicineService.update(req.params.id, req.body)
        .then(medicine => res.json(medicine))
        .catch(next);
}

function _delete(req, res, next) {
    medicineService.delete(req.params.id)
        .then(() => res.json({ message: 'Medicine deleted successfully' }))
        .catch(next);
}