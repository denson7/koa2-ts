import Koa from 'koa';

export interface Response {
  data?: any;
}

/**
 * 封装返回值
 * @param ctx 
 * @param status 
 * @param result 
 * @param msg 
 */
const responseJson = (ctx: Koa.ExtendableContext, status: number = 200, result: Response = { data: null }, msg: string = 'success') => {
  ctx.body = {
    code: status,
    msg,
    result,
    timestamp: Date.now()
  };
};
export default responseJson;
