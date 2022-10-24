var express = require('express')
var router = express.Router()

const exportPDF = require('../src/export/export-pdf')

/* GET home page. */
router.get('/export', exportPDF.export)
router.get('/preview', exportPDF.preview)

module.exports = router
