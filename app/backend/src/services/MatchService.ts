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

  async findByProgress(progress: string): Promise<MatchesModel[]> {
    const inProgressBoolean = progress === 'true';
    const filterByProgress = await this.model.findAll({
      where: { inProgress: inProgressBoolean },
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
    return filterByProgress;
  }

  async finishMatches(id: string): Promise<[number]> {
    const selectedMatch = await this.model.update({ inProgress: false }, { where: { id } });

    return selectedMatch;
  }

  async updateMatchesGoals(
    id: string,
    { homeTeamGoals, awayTeamGoals }: { homeTeamGoals: number; awayTeamGoals: number },
  ): Promise<[number]> {
    const selectedMatch = await this.model.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );

    return selectedMatch;
  }

  async createNewMatch(
    homeId: number,
    awayId: number,
    homeGoals: number,
    awayGoals: number,
  ): Promise <MatchesModel | boolean> {
    const findHomeTeamId = await this.model.findOne({ where: { homeTeamId: homeId } });
    const findAwayTeamId = await this.model.findOne({ where: { awayTeamId: awayId } });
    if (!findAwayTeamId || !findHomeTeamId) return false;
    const newMatch = await this.model
      .create({ homeTeamId: homeId,
        awayTeamId: awayId,
        homeTeamGoals: homeGoals,
        awayTeamGoals: awayGoals,
        inProgress: true });

    return newMatch;
  }
}
