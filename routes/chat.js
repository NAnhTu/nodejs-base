const express = require('express')
const router = express.Router()
const {getListChat} = require("../src/chat/controller");

router.get('/list-chat', getListChat)

module.exports = router
