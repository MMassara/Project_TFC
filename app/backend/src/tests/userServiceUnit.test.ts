import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import UserModel from '../database/models/UserModel';
import UserService from '../services/UserService';

import { app } from '../app';

import { Response } from 'superagent';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a Service User', () => {
  afterEach(function () {
    sinon.restore();
  })

  // it('Verifica se retorna o token ao efetuar o login com sucesso', async () => {
  //   const outputMock = {
  //           id: 2,
  //           username: 'User',
  //           role: 'user',
  //           email: 'user@user.com',
  //           password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  //     }

  //   sinon.stub(UserModel, 'findOne').resolves(outputMock as UserModel);

  //   const service = new UserService();
  //   const result = await service.sucessLogin("user@user.com", "secret_user");

  //   expect(result).to.be.eq(
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sImlhdCI6MTY3NzYyNTIzOX0.mYsy_Mjr6vWgaES3egohSJGk_82nfHvJsCnJmHpSR68"
  //   );
  // });

  it('Verifica o retorno caso o login não seja efetuado com sucesso', async () => {
    sinon.stub(UserModel, 'findOne').resolves(null)

    const service = new UserService();
    const result = await service.sucessLogin("usuario@usuario.com", "secret_user")

    expect(result).to.be.eq(null)
  })
});
