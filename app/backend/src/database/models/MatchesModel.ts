import { Model, INTEGER, BOOLEAN } from 'sequelize';
import TeamModel from './TeamModel';
import db from '.';

class MatchesModel extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
  modelName: 'matches',
});

TeamModel.hasMany(MatchesModel, { foreignKey: 'home_team_id', as: 'homeTeam' });
TeamModel.hasMany(MatchesModel, { foreignKey: 'away_team_id', as: 'awayTeam' });

MatchesModel.belongsTo(TeamModel, { foreignKey: 'home_team_id', as: 'homeTeam' });
MatchesModel.belongsTo(TeamModel, { foreignKey: 'away_team_id', as: 'awayTeam' });

export default MatchesModel;
