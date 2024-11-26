const express = require('express');
const { addEquipment, getAllEquipment,getUserEquipment, updateEquipment, deleteEquipment } = require('../controllers/equipmentController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public route to get all equipment

// Protected routes
router.post('/', auth, addEquipment);
router.get('/user',auth, getUserEquipment);
router.put('/:id', auth, updateEquipment);
router.delete('/:id', auth, deleteEquipment);
router.get('/all', getAllEquipment);

module.exports = router;