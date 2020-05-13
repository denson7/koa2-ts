import Koa from 'koa';
import axios from 'axios';
import responseJson from '../../utils/responseJson';

class OAuthController {
  public async github(ctx: Koa.Context) {
    const { code } = ctx.request.query;
    try {
      const clientId = '';
      const clientSecret = '';
      const tokenResponse = await axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token?' + `client_id=${clientId}&` + `client_secret=${clientSecret}&` + `code=${code}`,
        headers: {
          accept: 'application/json'
        }
      });
      const accessToken = tokenResponse.data.access_token;
      const result = await axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
          accept: 'application/json',
          Authorization: `token ${accessToken}`
        }
      });
      // const name = result.data.bio;
      responseJson(ctx, 200, result.data);
    } catch (error) {
      responseJson(ctx, 500, { data: error }, 'github授权失败');
    }
  }
  public async baidu(ctx: Koa.Context) {
    const { code } = ctx.request.query;
    try {
      const clientId = '';
      const clientSecret = '';
      const redirectUri = 'http://127.0.0.1:9000/oauth/baidu';
      const tokenResponse = await axios({
        method: 'post',
        url: `https://openapi.baidu.com/oauth/2.0/token?grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}`
      });
      const accessToken = tokenResponse.data.access_token;
      const result = await axios({
        method: 'get',
        url: `https://openapi.baidu.com/rest/2.0/passport/users/getInfo?access_token=${accessToken}`
      });
      // 渲染
      await ctx.render(`auth`, { data: JSON.stringify(result.data) });
    } catch (error) {
      responseJson(ctx, 500, { data: error }, 'baidu授权失败');
    }
  }
}

export default new OAuthController();
