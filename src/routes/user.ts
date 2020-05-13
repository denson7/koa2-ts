import Router from 'koa-router';
import UserController from '../controllers/user';
import CheckLogin from '../middleware/checkLogin';

// const router = new Router();
const router = new Router({ prefix: "/user" });

// const { auth } = require("../config");
// router.get("/home/:user/:password", auth, checkOwner, follow);
router.post("/register", UserController.register);
router.get("/login", UserController.login);
router.get("/list", CheckLogin, UserController.getList);
router.get("/test", UserController.test);

export default router;