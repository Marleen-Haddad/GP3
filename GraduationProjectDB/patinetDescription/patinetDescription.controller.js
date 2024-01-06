const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const patinetDescriptionService = require('./patinetDescription.service');

// routes
router.post('/create', createSchema, create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
module.exports = router;





function createSchema(req, res, next) {
    const schema = Joi.object({
        patientId: Joi.string().required() ,     
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    patinetDescriptionService.create(req.body)
        .then(() => res.json({ message: 'Creation successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    patinetDescriptionService.getAll()
        .then(patinetDescriptions => res.json(patinetDescriptions))
        .catch(next);
}



function getById(req, res, next) {
    patinetDescriptionService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        patientId: Joi.string().required() ,

    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    patinetDescriptionService.update(req.params.id, req.body)
        .then(patinetDescription => res.json(patinetDescription))
        .catch(next);
}

function _delete(req, res, next) {
    patinetDescriptionService.delete(req.params.id)
        .then(() => res.json({ message: 'Patinet Description deleted successfully' }))
        .catch(next);
}