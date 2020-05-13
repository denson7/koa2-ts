import Router from 'koa-router';
import OAuthController from '../controllers/oauth';


// const router = new Router();
const router = new Router({ prefix: "/oauth" });

// const { auth } = require("../config");
// router.get("/home/:user/:password", auth, checkOwner, follow);
router.post("/github", OAuthController.github);
router.get("/baidu", OAuthController.baidu);

export default router;