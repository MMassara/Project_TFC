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

describe('Testes para rota Users', () => {
  it('efetua o login com sucesso', async () => {
    const login = {
    email: "user@user.com",
    password: "secret_user"
}
    const response =  await chai.request(app).post('/login').send(login); 
    expect(response.status).to.be.equal(200);
  });

  it('sem sucesso', async () => {
    const login = {
    email: "usario@usario.com",
    password: "secret_user"
}
    const response = await chai.request(app).post('/login').send(login);
    expect(response.status).to.be.equal(401);
  })

  it('com input password menor que 6', async () => {
    const login = {
        email: "user@user.com",
        password: '12'
    }

    const response = await chai.request(app).post('/login').send(login);
    expect(response.status).to.be.equal(401);
  })

  it('sem o campo email preenchido', async () => {
    const login = {
        password: "secret_user"
    }

    const response = await chai.request(app).post('/login').send(login);
    expect(response.status).to.be.equal(400);
  })
})
