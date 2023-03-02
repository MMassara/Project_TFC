import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import HttpException from '../middlewares/HttpException';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(public matchService = new MatchService()) {}

  public findAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (typeof inProgress === 'string') {
      const filteredByProgress = await this.matchService.findByProgress(inProgress);

      return res.status(200).json(filteredByProgress);
    }

    const allMatches = await this.matchService.findAll();

    return res.status(200).json(allMatches);
  };

  public finishMatches = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    if (!token) throw new HttpException(401, 'Token not found');

    try {
      jwt.verify(token, 'jwt_secret');
    } catch (error) {
      throw new HttpException(401, 'Token must be a valid token');
    }

    const { id } = req.params;

    await this.matchService.finishMatches(id);

    return res.status(200).json({ message: 'Finished' });
  };
}
