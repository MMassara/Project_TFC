import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// import * as dotenv from 'dotenv';

// import IToken from '../interfaces/IToken';
import UserModel from '../database/models/UserModel';

// dotenv.config();

export default class UserService {
  protected model: ModelStatic<UserModel> = UserModel;

  async sucessLogin(email: string, password: string): Promise<string | null> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) return null;

    const userPassword = await bcrypt.compare(password, user.password);
    if (userPassword === false) return null;

    const payload = {
      user,
    };

    const token = jwt.sign(payload, 'jwt_secret');

    return token;
  }
}
