const router = require('express').Router();
const carHandler = require('./handlers/car');

router.post('/car', carHandler.create);
router.get('/car', carHandler.getAll);
router.get('/car/:id', carHandler.getById);
router.put('/car/:id', carHandler.update);
router.delete('/car/:id', carHandler.remove);

module.exports = router;