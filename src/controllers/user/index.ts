import Koa from 'koa';
import logger from '../../utils/logger';
// 封装返回
import responseJson from '../../utils/responseJson';

interface UserController {
  login: (ctx: Koa.Context) => Promise<any>;
  register: (ctx: Koa.Context) => Promise<any>;
  getList: (ctx: Koa.Context) => Promise<any>;
  test: (ctx: Koa.Context) => Promise<any>;
}

const userController: UserController = {
  login: async (ctx: Koa.Context) => {
    const generateTime = Date.now();
    // const jToken = await JWT.generate({ userId: 12, g_t: generateTime });
    logger.debug(process.cwd())
    return responseJson(ctx, 200, { data: 'jToken' }, '登录成功');
  },
  register: async (ctx: Koa.Context) => {
    //
  },
  getList: async (ctx: Koa.Context) => {
    //
  },
  test: async (ctx: Koa.Context) => {
    ctx.body = {
      code: 200,
      msg: 'success',
      result: []
    }
  },
}

export default userController;