import { Context, Next } from 'koa';
// import jsonwebtoken from 'jsonwebtoken';
import { JWT } from '../utils';

const CheckLogin = async (ctx: Context, next: Next) => {
  let { token = '' } = ctx.request.header;
  token = token.replace('Bearer ', '');
  try {
    // const user = jsonwebtoken.verify(token, 'jwt-secret');
    const user = JWT.verify(token, 'jwt-secret');
    ctx.state.user = user;
  } catch (e) {
    ctx.throw(401, e.message);
  }
  await next();
};

export default CheckLogin;
