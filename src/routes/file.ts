import Koa from 'koa';
import Router from 'koa-router';
import FielController from '../controllers/file';
import responseJson from '../utils/responseJson';

const router = new Router<Koa.DefaultContext, Koa.Context>();
// 方式1
// const router = new Router({ prefix: "/file" });
// router.post('/multi', FielController.MultiFile); // note: 类方法需定义为静态方法
// router.post('/single', FielController.SingleFile);

// 方式2
router
  .prefix('/file')
  .post('/multi', async (ctx) => {
    const res = await FielController.MultiFile(ctx); // 返回：true | false
    responseJson(ctx, res ? 200 : 500);
  })
  .post('/single', async (ctx) => {
    const res = await FielController.SingleFile(ctx); // 返回：true | false
    responseJson(ctx, res ? 200 : 500);
  })

export default router;
