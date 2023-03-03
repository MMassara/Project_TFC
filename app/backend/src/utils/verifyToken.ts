import * as jwt from 'jsonwebtoken';
import HttpException from '../middlewares/HttpException';

export default function verifyToken(token: string) {
  try {
    jwt.verify(token, 'jwt_secret');
  } catch (error) {
    throw new HttpException(401, 'Token must be a valid token');
  }
}
