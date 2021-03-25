/*

const express = require('express');
const app = require('../app');
const router = express.Router();

const auth = require('../middleware/auth');
const widgetCrtl = require('../controllers/widget');

router.post('/', auth, widgetCrtl.createThing);
router.put('/:id', auth, widgetCrtl.modifyThing);
router.delete('/:id', auth,widgetCrtl.deleteThing);
router.get('/:id', auth, widgetCrtl.getOneThing);
router.get('/', auth, widgetCrtl.getAllThings);

module.exports = router;

*/