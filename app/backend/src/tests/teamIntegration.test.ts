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

describe('Testes para rota Team', () => {
  it('lista todos os times com sucesso', async () => {
    const response =  await chai.request(app).get('/teams').send(); 
    expect(response.status).to.be.equal(200);
  });

  it('lista o time correto pelo ID', async () => {
    const response = await chai.request(app).get('/teams/5').send();
    expect(response.status).to.be.equal(200);
  })
})
