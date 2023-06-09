import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouters = Router();
const leaderboardController = new LeaderboardController();

leaderboardRouters.get('/home', (req: Request, res: Response) => leaderboardController
  .leaderboardHome(req, res));
leaderboardRouters.get('/away', (req: Request, res: Response) => leaderboardController
  .leaderboardAway(req, res));

export default leaderboardRouters;
