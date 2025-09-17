const express = require('express');
const router = express.Router();
const { getAll, create, update, remove } = require('../controllers/produtoController');
const auth = require('../middleware/auth');

router.get('/', getAll);
router.post('/', auth, create);    // só admin
router.put('/:id', auth, update);  // só admin
router.delete('/:id', auth, remove); // só admin

module.exports = router;
