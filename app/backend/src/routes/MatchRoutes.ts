import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';

const matchRouters = Router();
const matchController = new MatchController();

matchRouters.get('/', (req: Request, res: Response) => matchController.findAll(req, res));
matchRouters.patch('/:id/finish', (req: Request, res: Response) => matchController
  .finishMatches(req, res));
matchRouters.patch('/:id', (req: Request, res: Response) => matchController
  .updateMatchGoals(req, res));
matchRouters.post('/', (req: Request, res: Response) => matchController.createNewMatch(req, res));

export default matchRouters;
