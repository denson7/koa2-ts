import Koa from 'koa';
import config from 'config';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import jsonError from 'koa-json-error';
import cors from 'koa2-cors';
import koaHelmet from 'koa-helmet';
import path from 'path';
import session from 'koa-session';
import router from './routes';
import errTrace from './middleware/trace';
const parameter = require('koa-parameter');

// 创建实例
const app = new Koa();
app.use(errTrace);

// 注册错误处理中间件
app.use(
  jsonError({
    postFormat: (e, { stack, ...rest }) => (process.env.NODE_ENV === 'production' ? { stack, ...rest } : rest)
  })
);
app.keys = ['jwt secret'];
const session_config = {
  key: 'koa:sess', // cookie key (default is koa:sess)
  // maxAge: 24 * 60 * 60 * 1000, //  1 days cookie expire time, (millisecond)
  maxAge: 60 * 60 * 1000,
  autoCommit: true, // automatically commit headers (default true)
  overwrite: true, // overwrite (default true)
  httpOnly: true, // httpOnly (default true)
  signed: true, // signed (default true)
  rolling: true, // Force a session identifier cookie to be set on every response (default false)
  renew: false // renew session when session is nearly expired (default false)
};
app.use(session(session_config, app));
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      // uploadDir: path.join(__dirname, '../uploads'), // 上传文件目录
      keepExtensions: true, // 保留扩展名
      maxFieldsSize: 2 * 1024 * 1024 // 文件上传大小
      // onFileBegin: (name, file) => {
      // 文件上传前的设置
      // }
    }
  })
);
// 参数校验（校验请求体）注册在body解析中间件后面
app.use(parameter(app))
// 静态文件
app.use(koaStatic(path.join(__dirname, 'public')));
// 跨域
app.use(cors());
// 提高安全
app.use(koaHelmet());
// 注册路由
// app.use(koaRouter);
router(app);
app.on('error', (err, ctx) => {
  logger.error('server error', err);
});

// 启动服务
app.listen(config.get('port'), () => {
  console.log('app is running ' + config.get('port'));
});
