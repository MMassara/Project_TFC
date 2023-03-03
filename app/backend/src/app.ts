import 'express-async-errors';
import * as express from 'express';
import ErrorMIddleware from './middlewares/ErrorMiddleware';
import teamRoutes from './routes/TeamsRoutes';
import userRoutes from './routes/UserRoutes';
import matchRouters from './routes/MatchRoutes';
import leaderboardRouters from './routes/LeaderboardRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/teams', teamRoutes);
    this.app.use('/login', userRoutes);
    this.app.use('/matches', matchRouters);
    this.app.use('/leaderboard', leaderboardRouters);
    this.app.use(ErrorMIddleware.handle);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
