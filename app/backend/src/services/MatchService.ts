import { ModelStatic } from 'sequelize';

import MatchesModel from '../database/models/MatchesModel';

export default class MatchService {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async findAll(): Promise<any> {
    const result = await this.model.findAll();

    return result;
  }
}
