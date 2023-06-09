import queryResumeAway from '../utils/queryResumeAway';
import Model from '../database/models';
import IResumeTeam from '../interfaces/IResumeTeam';

import queryResumeTeam from '../utils/queryResumeTeam';

export default class LeaderboardService {
  protected model = Model;

  public async leaderboardHome(): Promise<IResumeTeam[]> {
    const [result] = await this.model.query(queryResumeTeam) as IResumeTeam[];

    return result as unknown as IResumeTeam[];
  }

  public async leaderboardAway(): Promise<IResumeTeam[]> {
    const [result] = await this.model.query(queryResumeAway) as IResumeTeam[];

    return result as unknown as IResumeTeam[];
  }
}
