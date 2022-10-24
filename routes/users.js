const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - users
 *     summary: Get current user
 *     description: Get current user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *            type: integer
 *            minimum: 1
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags:
 *       - users
 *     summary: Get user by id
 *     description: Get user by id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 */

router.get('/', function (req, res) {
  res.send('respond with a resource')
})

module.exports = router
