const express = require('express')
const fs = require('fs-extra')
const {checkToken, update} = require("../src/users/controller");
const {isAuth} = require("../src/auth/middleware");
const router = express.Router()

const multer = require('multer');
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let path = `./public/uploads/`;
    let existsPath = await fs.exists(path)
    if (!existsPath) {
      fs.mkdirsSync(path)
    }
    cb(null,  path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

router.get('/', function (req, res) {
  res.send('respond with a resource')
})

router.get('/check-token', checkToken)
router.post('/update/:user_code', isAuth, upload.single('image'), update)

module.exports = router
