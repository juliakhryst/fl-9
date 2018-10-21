const express = require('express');
const carHandler = require('./handlers/car');
const router = express.Router();

router.post('/car', carHandler.create);
router.get('/car', carHandler.getAll);
router.get('/car/:id', carHandler.getById);
router.put('/car/:id', carHandler.update);
router.delete('/car/:id', carHandler.remove);

module.exports = router;