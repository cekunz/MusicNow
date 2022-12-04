import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import ProfileCollection from './collection';
import UserCollection from '../user/collection';
import * as util from './util';

const router = express.Router();

/**
 * Get all profiles in the database
 *
 * @name GET /api/profile/
 *
 * @return {ProfileResponse[]} - A list of all profiles created in the database
 * @throws {400} - If author is not given
 */
/**
 * Get the profile of a given user
 *
 * @name GET /api/profile/:username?
 *
 * @return {ProfileResponse} - Profile of the User
 * @throws {400} - If author is not given
 * @throws {404} - If no user has given author
 *
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.username !== undefined) {
        next();
        return;
    }
    // get all profiles in the database
    const username = (req.params.username as string) ?? undefined;
    const allProfiles = await ProfileCollection.findAll();
    const response = allProfiles.map(util.constructProfileResponse);
    res.status(200).json(response);
  },
  async (req: Request, res: Response) => {
    // get profile of the given user
    const profile = await ProfileCollection.findOneByUsername(req.params.username as string);
    const response = util.constructProfileResponse(profile);
    res.status(200).json(response);
  }
);

/**
 * Update a user's profile.
 *
 * @name PATCH /api/profile
 *
 * @param {string} username - The profile user's username 
 * @return {UserResponse} - The updated user
 * @throws {403} - If user is not logged in
 */
 router.patch(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
      const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
      const user = await UserCollection.findOneByUserId(userId);
      const username = user.username;
      const profile = await ProfileCollection.updateOne(username);
      res.status(200).json({
        message: 'Your profile was updated successfully.',
        profile: util.constructProfileResponse(profile)
      });
    }
  );


/**
 * Delete a profile
 *
 * @name DELETE /api/profile/:username?
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 */
router.delete(
  '/:username?',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const username = req.params.username as string
    await ProfileCollection.deleteOneByUsername(username);
    res.status(200).json({
      message: 'Your Profile was deleted successfully.'
    });
  }
);

export {router as profileRouter};
