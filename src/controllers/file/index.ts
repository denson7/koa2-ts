import Koa from 'koa';
import fs from 'fs';
import path from 'path';

interface FileObj {
  [key: string]: any;
}

// process.cwd() 返回 Node.js 进程的当前工作目录(项目根目录)
// note: 上传目录文件夹需提前创建
const UPLOAD_PATH: string = path.join(process.cwd(), 'uploads/');

// 创建上传目录
fs.exists(UPLOAD_PATH, (exists) => {
  if (!exists) {
    fs.mkdirSync(UPLOAD_PATH);
  }
});

class FileController {
  public async MultiFile(ctx: Koa.Context) {
    const file = ctx.request.files.fileName; // 文件名定义为fileName
    const reader: fs.ReadStream[] = [];
    const upStream: fs.WriteStream[] = [];
    const promise: Promise<boolean>[] = [];
    file.map((item: FileObj) => {
      const filePath = UPLOAD_PATH + item.name;
      reader.push(fs.createReadStream(item.path));
      upStream.push(fs.createWriteStream(filePath));
    });
    reader.map((item, idx) => {
      promise.push(
        new Promise((resolve: (value?: boolean | PromiseLike<boolean> | undefined) => void) => {
          item.pipe(upStream[idx]);
          item.on('end', () => {
            resolve(true);
          });
          item.on('error', async () => {
            resolve(false);
          });
        })
      );
    });
    const flag = await Promise.all(promise);
    if (flag.filter((item: boolean) => !item)) {
      return true;
    }
    // return false;
  }
  public SingleFile(ctx: Koa.Context) {
    return new Promise((resolve: (value?: boolean | PromiseLike<boolean> | undefined) => void) => {
      const { file } = ctx.request.files; // 文件name定义为file
      // 创建可读流
      const reader = fs.createReadStream(file.path);
      const filePath = UPLOAD_PATH + file.name;
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
      reader.on('end', async () => {
        resolve(true);
      });
      reader.on('error', async () => {
        resolve(false);
      });
    });
  }
}

export default new FileController();
