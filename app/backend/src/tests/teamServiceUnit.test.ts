import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamService from '../services/TeamService';
import TeamModel from '../database/models/TeamModel'

import { app } from '../app';

import { Response } from 'superagent';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a tabela Teams', () => {
  afterEach(function () {
    sinon.restore();
  })

  it('Verifica se é possível buscar todos os times da Tabela Teams', async () => {
    const outputMock = [
      {
        id: 1,
        teamName: 'Avaí/Kindermann'
      },
      {
        id: 2,
        teamName: 'Bahia'
      }
    ]

    sinon.stub(TeamModel, 'findAll').resolves(outputMock as TeamModel[]);

    const service = new TeamService();
    const result = await service.findAll();

    expect(result).to.be.eq(outputMock);
  });

  it('Verifica se é possível buscar o time pelo ID na Tabela Teams', async () => {
    const outputMock = {
      id: 5,
      teamName: 'Cruzeiro'
    }

    sinon.stub(TeamModel, 'findByPk').resolves(outputMock as TeamModel)

    const service = new TeamService();
    const result = await service.getTeamById(5)

    expect(result).to.be.eq(outputMock);
  });

  it('Verifica se é nulo ao buscar o ID de um time inexistente', async () => {

    sinon.stub(TeamModel, 'findByPk').resolves(null)

    const service = new TeamService();
    const result = await service.getTeamById(55)

    expect(result).to.be.eq(null);
  })
});
