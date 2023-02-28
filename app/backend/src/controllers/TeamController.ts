import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(public teamsService = new TeamService()) {}

  public findAll = async (_req: Request, res: Response) => {
    const allTeams = await this.teamsService.findAll();

    return res.status(200).json(allTeams);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const selectedId = Number(id);
    const selectedTeam = await this.teamsService.getTeamById(selectedId);

    return res.status(200).json(selectedTeam);
  };
}
