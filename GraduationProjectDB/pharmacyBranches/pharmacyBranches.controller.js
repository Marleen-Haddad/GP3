const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const pharmacyBranchesService = require('./pharmacyBranches.service');

// routes
router.post('/create', createSchema, create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;


function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        pharmacyId: Joi.string().required()       
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    pharmacyBranchesService.create(req.body)
        .then(() => res.json({ message: 'Creation successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    pharmacyBranchesService.getAll()
        .then(pharmacyBranches => res.json(pharmacyBranches))
        .catch(next);
}



function getById(req, res, next) {
    pharmacyBranchesService.getById(req.params.id)
        .then(pharmacyBranches=> res.json(pharmacyBranches))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        pharmacyId: Joi.string().empty(''),       
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    pharmacyBranchesService.update(req.params.id, req.body)
        .then(pharmacyBranches=> res.json(pharmacyBranches))
        .catch(next);
}

function _delete(req, res, next) {
    pharmacyBranchesService.delete(req.params.id)
        .then(() => res.json({ message: 'Branch deleted successfully' }))
        .catch(next);
}