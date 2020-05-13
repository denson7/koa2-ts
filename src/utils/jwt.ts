import jsonwebtoken from 'jsonwebtoken';
import logger from './logger';

export default class JWT {
  public static async generate(value: any, secret: string = 'jwt_secret', expires = '7 days') {
    try {
      return jsonwebtoken.sign(value, secret, { expiresIn: expires });
    } catch (e) {
      logger.error('jwt sign error --->', e);
      return false;
    }
  }
  public static async verify(token: string, secret: string = 'jwt_secret'): Promise<any> {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (e) {
      logger.error('jwt verify error --->', e);
      return false;
    }
  }
}