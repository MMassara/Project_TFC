import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// import * as dotenv from 'dotenv';

// import IToken from '../interfaces/IToken';
import UserModel from '../database/models/UserModel';
import HttpException from '../middlewares/HttpException';

// dotenv.config();

export default class UserService {
  protected model: ModelStatic<UserModel> = UserModel;

  async sucessLogin(email: string, password: string): Promise<string | null> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) return null;

    const userPassword = await bcrypt.compare(password, user.password);
    if (userPassword === false) return null;

    const { id, role } = user.dataValues;

    const payload = {
      id,
      role,
    } as jwt.JwtPayload;

    const token = jwt.sign({ ...payload }, 'jwt_secret');

    return token;
  }

  static async verifyToken(token: string | undefined): Promise<jwt.JwtPayload> {
    if (!token) throw new HttpException(401, 'Token not found');
    try {
      const userToken = jwt.verify(token, 'jwt_secret');
      return userToken as jwt.JwtPayload;
    } catch (error) {
      throw new HttpException(401, 'Token invalid');
    }
  }
}
