const express = require('express');
const router = express.Router();
// const { verifyToken } = require('../middleware/verifyToken');
const { verifyEmail } = require('../middleware/verifyEmail');


const userController = require('../controllers/userController');

router.get("/users", userController.getAllUsers);

router.get("/users/:userId", userController.getOneUser);

router.get("/acolits", userController.getAcolitsUsers);

router.post("/token", /*verifyToken,*/ verifyEmail, userController.loginUser);

router.patch("/users/:userEmail", userController.updateOneUser);

router.delete("/users/:userId", userController.deleteOneUser);

module.exports = router;