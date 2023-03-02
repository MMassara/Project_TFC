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
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_id',
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_goals',
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

MatchesModel.belongsTo(TeamModel, { as: 'homeTeamId', foreignKey: 'homeTeamId' });
MatchesModel.belongsTo(TeamModel, { as: 'awayTeamId', foreignKey: 'awayTeamId' });
TeamModel.hasMany(MatchesModel, { as: 'id' });

export default MatchesModel;
