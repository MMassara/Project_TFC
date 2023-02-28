import { Router, Request, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamRoutes = Router();
const teamController = new TeamController();

teamRoutes.get('/teams', (req: Request, res: Response) => teamController.findAll(req, res));
teamRoutes.get('/teams/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default teamRoutes;
