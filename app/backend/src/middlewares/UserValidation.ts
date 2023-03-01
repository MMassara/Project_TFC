// import { Request, Response, NextFunction } from 'express';
// import UserService from '../services/UserService';

// export default class UserValidation {
//   constructor(public usersService = new UserService()) {}

//   public validToken = async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization;
//     if (!token) return res.status(401).json({ message: 'Token not found' });
//     try {
//       UserService.verifyToken(token);
//     } catch (error) {
//       return res.status(401).json({ message: 'Token must be a valid token' });
//     }
//     return next();
//   };
// }
