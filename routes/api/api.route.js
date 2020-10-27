const express = require('express')
const router = express.Router()
router.use('/', require('./sudoku.route'))
module.exports = router