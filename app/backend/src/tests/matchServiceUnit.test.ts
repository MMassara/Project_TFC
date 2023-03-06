import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchService from '../services/MatchService';
import MatchesModel from '../database/models/MatchesModel';
import IMatches from '../interfaces/IMatches';

import { app } from '../app';

import { Response } from 'superagent';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para rota Matches', () => {
    afterEach(function () {
        sinon.restore();
    })

    it('Lista todas as partidas com sucesso', async () => {
        const outputMock = [
            {
              "id": 1,
              "homeTeamId": 16,
              "homeTeamGoals": 1,
              "awayTeamId": 8,
              "awayTeamGoals": 1,
              "inProgress": false,
              "homeTeam": {
                "teamName": "São Paulo"
              },
              "awayTeam": {
                "teamName": "Grêmio"
              }
            }]
        
        sinon.stub(MatchesModel, 'findAll').resolves(outputMock as unknown as MatchesModel[]);
        
        const service = new MatchService();
        const result = await service.findAll();

        expect(result).to.be.eq(outputMock);
    })

    it('Lista todas as partidas em andamanto', async () => {
        const outputMock = [
            {
              "id": 41,
              "homeTeamId": 16,
              "homeTeamGoals": 2,
              "awayTeamId": 9,
              "awayTeamGoals": 0,
              "inProgress": true,
              "homeTeam": {
                "teamName": "São Paulo"
              },
              "awayTeam": {
                "teamName": "Internacional"
              }
            },
            {
              "id": 42,
              "homeTeamId": 6,
              "homeTeamGoals": 1,
              "awayTeamId": 1,
              "awayTeamGoals": 0,
              "inProgress": true,
              "homeTeam": {
                "teamName": "Ferroviária"
              },
              "awayTeam": {
                "teamName": "Avaí/Kindermann"
              }
            }
          ]

        sinon.stub(MatchesModel, 'findAll').resolves(outputMock as unknown as MatchesModel[]);

        const service = new MatchService();
        const result = await service.findByProgress('true');

        expect(result).to.be.eq(outputMock);
    })
})
