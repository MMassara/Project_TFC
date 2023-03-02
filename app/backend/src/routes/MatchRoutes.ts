import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';

const matchRouters = Router();
const teamController = new MatchController();

matchRouters.get('/', (req: Request, res: Response) => teamController.findAll(req, res));

export default matchRouters;
