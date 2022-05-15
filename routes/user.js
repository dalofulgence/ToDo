const express = require('express');
const router = express.Router();
const { saveUser } = require('../middleware/validation.js');
const contControl = require('../controllers/user');

router.get('/', contControl.getAll, (req, res)=>{
    res.sendFile(path.join(__dirname, '/static/index.html'));
});


router.get('/:id', contControl.getSingle);

router.post('/', saveUser, contControl.createUser);

router.put('/:id', saveUser, contControl.updateUser);

router.delete('/:id', contControl.deleteUser);


module.exports = router;