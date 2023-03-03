import * as sequelize from 'sequelize';

import TeamModel from '../database/models/TeamModel';
import getLeaderboard from '../utils/getLeaderboard';

export default class LeaderboardService {
  protected model: sequelize.ModelStatic<TeamModel> = TeamModel;

  public async leaderboardHome(): Promise<TeamModel[]> {
    // const result = await this.model.findAll();
    const result = await getLeaderboard();

    return result;
  }
}
