import express from 'express';
import { allFollowers } from '../controller/followerController.js';

const followerRoute = express.Router();

followerRoute.get('/follower', allFollowers);

export default followerRoute;