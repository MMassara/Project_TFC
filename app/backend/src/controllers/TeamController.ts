import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(public teamsService = new TeamService()) {}

  public findAll = async (_req: Request, res: Response) => {
    const allTeams = await this.teamsService.findAll();

    return res.status(200).json(allTeams);
  };
}
