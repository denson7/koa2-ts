import Koa from 'koa';
// import { Files } from 'formidable';
import { responseJson, logger } from '../utils';

type RES_TYPE = typeof responseJson;
type LOG4_TYPE = typeof logger;

declare global {
  const logger: LOG4_TYPE;
  const responseJson: RES_TYPE;
}

// tsconfig.json 中设置 typeRoots 属性, 添加内容 ["node_modules/@types", "src/typings"]
declare module 'koa' {
  interface Request extends Koa.BaseRequest {
    files?: any;
  }
}
