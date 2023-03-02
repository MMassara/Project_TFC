import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';

import MatchesModel from '../database/models/MatchesModel';

export default class MatchService {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async findAll(): Promise<MatchesModel[]> {
    const result = await this.model.findAll({
      attributes: {
        exclude: ['home_team_id', 'away_team_id'],
      },
      include: [{
        model: TeamModel,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      }, {
        model: TeamModel,
        as: 'awayTeam',
        attributes: { exclude: ['id'] },
      }],
    });

    return result;
  }
}
