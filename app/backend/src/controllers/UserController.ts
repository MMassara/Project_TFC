import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(public usersService = new UserService()) {}

  public sucessLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    const validateEmail = (e:string) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(e);
    };

    const validEmail = validateEmail(email);

    if (password.length < 6 || validEmail === false) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validUser = await this.usersService.sucessLogin(email, password);
    if (!validUser) return res.status(401).json({ message: 'Invalid email or password' });

    return res.status(200).json({ token: validUser });
  };
}
