import ITeams from './ITeams';

export default interface IServiceTeams {
  findAll(): Promise<ITeams[]>
  getTeamById(id: number): Promise<ITeams | null>
}
