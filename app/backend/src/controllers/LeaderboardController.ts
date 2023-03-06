// import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(public leaderboardService = new LeaderboardService()) {}

  public leaderboardHome = async (_req: Request, res: Response) => {
    const result = await this.leaderboardService.leaderboardHome();

    return res.status(200).json(result);
  };

  public leaderboardAway = async (_req:Request, res: Response) => {
    const result = await this.leaderboardService.leaderboardAway();

    return res.status(200).json(result);
  };
}
