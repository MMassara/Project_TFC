import { NextFunction, Request, Response } from 'express';
import HttpException from './HttpException';

export default class ErrorMIddleware {
  public static handle(err: Error, _req: Request, res: Response, _next: NextFunction) {
    // if (err instanceof JsonWebTokenError) {
    //   return res.status(401).json({ message: err.message });
    // }
    // return res.status(500).json({ message: err.message });
    const { status, message } = err as HttpException;
    res.status(status || 500).json({ message });
  }
}
