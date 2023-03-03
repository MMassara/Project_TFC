import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';

export default async function getLeaderboard() {
  const result = await TeamModel.findAll({
    attributes: [
      ['team_name', 'name'],
      [
        sequelize.literal(
          '(SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 3 ELSE 0 END) + SUM(CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END))'
        ),
        'totalPoints',
      ],
      [sequelize.fn('SUM', sequelize.col('matches.home_team_id')), 'totalGames'],
      [
        sequelize.fn('SUM', sequelize.literal('CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 1 ELSE 0 END')),
        'totalVictories',
      ],
      [
        sequelize.fn('SUM', sequelize.literal('CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END')),
        'totalDraws',
      ],
      [
        sequelize.fn('SUM', sequelize.literal('CASE WHEN matches.home_team_goals < matches.away_team_goals THEN 1 ELSE 0 END')),
        'totalLosses',
      ],
      [sequelize.fn('SUM', sequelize.col('matches.home_team_goals')), 'goalsFavor'],
      [sequelize.fn('SUM', sequelize.col('matches.away_team_goals')), 'goalsOwn'],
    ],
    include: [
      {
        model: MatchesModel,
        as: 'matches',
        attributes: [],
        where: { inProgress: 0 },
      },
    ],
    group: ['name'],
  });
  return result
}
