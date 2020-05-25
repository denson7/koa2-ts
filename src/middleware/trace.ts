import Koa, { Context, Next } from 'koa';
import { logger } from '../utils';

const errTrace = async (ctx: Context, next: Next) => {
  try {
    const startTime = Date.now();
    await next();
    const endTime = Date.now();
    const { method, path, status } = ctx;
    const params = JSON.stringify(ctx.request.body);
    const diffTime = endTime - startTime;
    logger.trace(`Request Method: ${method}, Request Path: ${path}, Response Code: ${status},Request Params: ${params}, Time: ${diffTime} ms`);
    if (ctx.status === 404) {
      return (ctx.body = { url: `${path}`, status: 404, msg: 'bad request path', timestamp: Date.now() });
    }
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.type = 'json';
    ctx.response.body = {
      code: ctx.response.status,
      message: err.message,
      timestamp: Date.now()
    };
    ctx.app.emit('error', err, ctx);
  }
};
export default errTrace;
