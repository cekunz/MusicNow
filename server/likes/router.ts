/* eslint-disable arrow-parens */
import type {Request, Response} from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import * as likedValidator from './middleware';
import likedObjectCollection from './collection';
import MixtapeCollection from '..//mixtape/collection';
import * as util from './util';

const router = express.Router();

/**
 * Get the likes for a given ID
 *
 * @name GET /api/likes/:id
 *
 * @param {string} id - the id of the liked object
 *
 * @return {likeResponse} - A list of all favorites sent by username
 * @throws {404} - If an object with the given id does not exist
 */
router.get(
  '/:id',
  [likedValidator.isLikedExists],
  async (req: Request, res: Response) => {
    const likedId = req.params.id ?? undefined;
    const liked = await likedObjectCollection.findOne(likedId);
    const response = util.constructLikeResponse(liked);
    res.status(200).json(response);
  }
);

/**
 * Add likes functionality to old mixtapes that did not have them before.
 *
 * @name GET /api/likes/:id
 *
 * @param {string} id - the id of the liked object
 *
 * @return {likeResponse} - A list of all favorites sent by username
 * @throws {404} - If an object with the given id does not exist
 */
router.post('/magic', async (req: Request, res: Response) => {
  const mixtapes = await MixtapeCollection.findAll();
  const likeObjects = mixtapes.map(async (mixtape) =>
    likedObjectCollection.addOne(mixtape._id, [])
  );
  await Promise.all(likeObjects);
  res.status(200).json({message: 'complete'});
});
/**
 * Create a new likedObject.
 *
 * @name POST /api/likes/
 *
 * @param {string} id - The id of the object being liked
 *
 * @return {likeResponse} - The created favorite
 * @throws {403} - If the object being liked already exists in the DB
 */
router.post(
  '/',
  [likedValidator.isLikedDoesntExist],
  async (req: Request, res: Response) => {
    const likedId = req.body.id as string;
    const liked = await likedObjectCollection.addOne(likedId);
    res.status(201).json({
      message: 'likedObject created successfully.',
      prompt: util.constructLikeResponse(liked)
    });
  }
);

/**
 * Update a likedObject's likes by adding or removing logged in user
 *
 * @name PATCH /api/likes/
 *
 * @param {string} id - The Id of the object being liked
 * @param {boolean} remove - true if user should be removed from likes
 * @return {likeResponse} - The updated likedObject
 * @throws {403} - If user is not logged in
 * @throws {404} - If likedObject does not exist
 */
router.patch(
  '/',
  [likedValidator.isLikedExists],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const liked = await likedObjectCollection.updateOne(
      req.body.id,
      userId,
      req.body.remove
    );
    res.status(200).json({
      message: 'likedObject was updated successfully.',
      user: util.constructLikeResponse(liked)
    });
  }
);

/**
 * Delete a like
 *
 * @name DELETE /api/likes/
 *
 * @param {string} id - the Id of the object that is liked
 *
 * @return {string} - A success message
 * @throws {404} - If an object with the Id does not exist
 *
 */
router.delete(
  '/',
  [likedValidator.isLikedExists],
  async (req: Request, res: Response) => {
    const likedId = (req.body.id as string) ?? undefined;
    await likedObjectCollection.deleteOne(likedId);

    res.status(200).json({
      message: 'likedObject deleted successfully.'
    });
  }
);

export {router as likeRouter};
