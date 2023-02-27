import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamService from '../services/TeamService';
import ITeams from '../interfaces/ITeams';
import TeamModel from '../database/models/TeamModel'

import { app } from '../app';

import { Response } from 'superagent';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a camada Service da tabela Teams', () => {
  afterEach(function () {
    sinon.restore();
  })

  it('Verifica se é possível buscar todos os times da tabela Teams', async () => {
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
});
