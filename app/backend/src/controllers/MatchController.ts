// import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import HttpException from '../middlewares/HttpException';
import MatchService from '../services/MatchService';
import verifyToken from '../utils/verifyToken';

const tokenNotFound = 'Token not found';

export default class MatchController {
  constructor(public matchService = new MatchService()) {}

  public findAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (typeof inProgress === 'string') {
      const filteredByProgress = await this.matchService.findByProgress(inProgress);

      return res.status(200).json(filteredByProgress);
    }

    const allMatches = await this.matchService.findAll();

    return res.status(200).json(allMatches);
  };

  public finishMatches = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    if (!token) throw new HttpException(401, tokenNotFound);

    // try {
    //   jwt.verify(token, 'jwt_secret');
    // } catch (error) {
    //   throw new HttpException(401, 'Token must be a valid token');
    // }

    await verifyToken(token);

    const { id } = req.params;

    await this.matchService.finishMatches(id);

    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatchGoals = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    if (!token) throw new HttpException(401, tokenNotFound);

    // try {
    //   jwt.verify(token, 'jwt_secret');
    // } catch (error) {
    //   throw new HttpException(401, 'Token must be a valid token');
    // }

    await verifyToken(token);

    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this.matchService.updateMatchesGoals(id, { homeTeamGoals, awayTeamGoals });

    return res.status(200).json({ message: 'Goals updated successfully' });
  };

  public createNewMatch = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    if (!token) throw new HttpException(401, tokenNotFound);

    // try {
    //   jwt.verify(token, 'jwt_secret');
    // } catch (error) {
    //   throw new HttpException(401, 'Token must be a valid token');
    // }

    await verifyToken(token);

    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const result = await this.matchService
      .createNewMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

    if (result === false) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    return res.status(201).json(result);
  };
}
