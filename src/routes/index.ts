import fs from 'fs';

const router = (app: any) => {
  fs.readdirSync(__dirname).forEach( async (file) => {
    if (file === 'index.ts') {
      return;
    }
    // const route = require(`./${file}`); // module.exports 方式导出
    const route = require(`./${file}`).default;
    app.use(route.routes()).use(route.allowedMethods()); //allowedMethods  响应option
  });
};

export default router;
