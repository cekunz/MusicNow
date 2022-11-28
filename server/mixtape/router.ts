import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import SongCollection from '../song/collection';
import * as userValidator from '../user/middleware';
import * as mixtapeValidator from './middleware';
import MixtapeCollection from './collection';
import * as util from './util';

const router = express.Router();

/**
 * Get all mixtapes by a user
 *
 * @name GET /api/mixtape/:username
 *
 * @return {MixtapeResponse[]} - A list of all mixtapes created by username
 * @throws {400} - If author is not given
 */
/**
 * Get the mixtape by a user on a given date
 *
 * @name GET /api/mixtape/:username?date=date
 *
 * @return {MixtapeResponse} - Song with given title and author
 * @throws {400} - If author is not given
 * @throws {404} - If no user has given author
 * @throws {405} - If the date is invalid
 *
 */
router.get(
  '/:username?',
  async (req: Request, res: Response, next: NextFunction) => {
    // got to next function if song arguments are given
    if (req.query.date !== undefined) {
        next();
        return;
    }
    const username = (req.params.username as string) ?? undefined;
    const allUserMixtapes = await MixtapeCollection.findAllbyCreator(username);
    const response = allUserMixtapes.map(util.constructMixtapeResponse);
    res.status(200).json(response);
  },
  [
    mixtapeValidator.isMixtapeExists
  ],
  async (req: Request, res: Response) => {
    const mixtape = await MixtapeCollection.findOneByCreatorByDate(req.params.username as string, new Date(req.query.date as string));
    const response = util.constructMixtapeResponse(mixtape);
    res.status(200).json(response);
  }
);

/**
 * Create a new mixtape.
 *
 * @name POST /api/mixtape/:username?
 * 
 * Body: 3 song IDs
 *
 * @param {string} song1Id - The track Id of the song on spotify
 * @param {string} song2Id - The track Id of the song on spotify
 * @param {string} song3Id - The track Id of the song on spotify
 * @param {string} username - The name of the creator
 * 
 * @return {MixtapeResponse} - The created song
 * @throws {403} - If the user is not logged in
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const song1 = await SongCollection.findOne(req.body.song1);
    const song2 = await SongCollection.findOne(req.body.song2);
    const song3 = await SongCollection.findOne(req.body.song3);
    const username = req.params.username as string;
    const date = new Date();
    const mixtape = await MixtapeCollection.addOne(song1, song2, song3, username, date)

    res.status(201).json({
      message: 'Your song was created successfully.',
      mixtape: util.constructMixtapeResponse(mixtape)
    });
  }
);

/**
 * Delete a mixtape
 *
 * @name DELETE /api/mixtape/:username?date=date
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
//  * @throws {404} - If the songId is not valid
 */
router.delete(
  '/:username?',
  [
    userValidator.isUserLoggedIn,
    mixtapeValidator.isMixtapeExists,
  ],
  async (req: Request, res: Response) => {
    const username = req.params.username as string
    const date = req.query.date as string
    await MixtapeCollection.deleteOneByCreatorByDate(username, new Date(date));
    res.status(200).json({
      message: 'Your Song was deleted successfully.'
    });
  }
);

export {router as mixtapeRouter};
