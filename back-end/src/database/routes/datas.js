const express = require('express');

const router = express.Router();

const { createOrUpadte } = require('../controllers/dates');

router.post('/', createOrUpadte);

module.exports = router;
