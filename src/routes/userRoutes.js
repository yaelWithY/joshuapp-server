const express = require('express');
const router = express.Router();
// const { verifyToken } = require('../middleware/verifyToken');
const { verifyEmail } = require('../middleware/verifyEmail');


const userController = require('../controllers/userController');

router.get("/users", userController.getAllUsers);

router.get("/users/:userId", userController.getOneUser);

router.get("/acolits/:gmail", userController.getOneAcolit);

router.get("/acolits", userController.getAcolitsUsers);

router.post("/token", /*verifyToken,*/ verifyEmail, userController.loginUser);

router.patch("/users/:userId", userController.updateOneUser);

router.patch("/acolitstate/:userEmail", userController.updateUserActive);

router.delete("/users/:userId", userController.deleteOneUser);

module.exports = router;