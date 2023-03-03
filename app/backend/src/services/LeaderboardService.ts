import { ModelStatic } from 'sequelize';

// import TeamModel from '../database/models/TeamModel';

import MatchesModel from '../database/models/MatchesModel';

export default class LeaderboardService {
  protected model: ModelStatic<MatchesModel> = MatchesModel;
}
