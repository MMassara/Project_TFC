import { ModelStatic } from 'sequelize';

import IServiceTeams from '../interfaces/IServiceTeams';
import ITeams from '../interfaces/ITeams';
import TeamModel from '../database/models/TeamModel';

export default class TeamService implements IServiceTeams {
  protected model: ModelStatic<TeamModel> = TeamModel;

  async findAll(): Promise<ITeams[]> {
    const result = await this.model.findAll();

    return result;
  }
}
