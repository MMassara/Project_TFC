import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(public matchService = new MatchService()) {}

  public findAll = async (_req: Request, res: Response) => {
    const allMatches = await this.matchService.findAll();

    return res.status(200).json(allMatches);
  };
}
