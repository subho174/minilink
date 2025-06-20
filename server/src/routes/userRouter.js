const { Router } = require("express");
const { signUp, signIn, logOut } = require("../controllers/user.controller");
const verifyJWT = require("../middleware/auth.middleware");

const userRouter = Router();
userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);
userRouter.post("/logout", verifyJWT, logOut);

module.exports = userRouter;
