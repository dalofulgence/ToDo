const express = require('express');
const router = express.Router();

const contControl = require('../controllers/user');

router.get('/', contControl.getAll);

router.get('/:id', contControl.getSingle);

router.post('/', contControl.createUser);

router.put('/:id', contControl.updateUser);

router.delete('/:id', contControl.deleteUser);


module.exports = router;