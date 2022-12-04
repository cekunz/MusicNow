import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import FriendCollection from './collection';
import * as util from './util';

const router = express.Router();

/**
 * Get all friends for a user
 *
 * @name GET /api/friend/:username?confirmed=true
 *
 * @return {FriendResponse[]} - A list of all of a users' friends
 * @throws {400} - If author is not given
 */
/**
 * Get all friend requests for a user
 *
 * @name GET /api/friend/:username?confirmed=false
 *
 * @return {FriendResponse} - friend request
 *
 */
router.get(
  '/:username?',
  [userValidator.isUserLoggedIn],
  async (req: Request, res: Response, next: NextFunction) => {
    // Go to next function if song arguments are given
    if (req.query.confirmed) {
      next();
      return;
    }

    // Friend requests
    const username = (req.params.username as string) ?? undefined;
    const friendRequests = await FriendCollection.findFriendRequests(username);
    res.status(200).json(friendRequests);
  },
  [userValidator.isUserLoggedIn],
  // Friends
  async (req: Request, res: Response) => {
    const username = (req.params.username as string) ?? undefined;
    const friend = await FriendCollection.findFriends(username);
    res.status(200).json(friend);
  }
);

/**
 * Send a new friend request.
 *
 * @name POST /api/friend/:username?user=username
 *
 * @param {string} username - The name of the user being requested
 *
 * @return {FriendResponse} - The created friend request
 * @throws {403} - If the user is not logged in
 */
router.post(
  '/:username?',
  [userValidator.isUserLoggedIn],
  async (req: Request, res: Response) => {
    const requestingUser = req.params.username;
    const user = req.query.user as string;
    const friend = await FriendCollection.sendFriendRequest(
      requestingUser,
      user
    );

    res.status(201).json({
      message: 'Your friend request was created successfully.',
      mixtape: util.constructFriendResponse(friend)
    });
  }
);

/**
 * Accept/reject a friend request
 *
 * @name PATCH /api/friend/:username?user=user&confirmed=confirmed
 *
 * @return {FriendResponse || Boolean} - the updated friend or a boolean confirming a rejection
 * @throws {403} - if the user is not logged in
 */
router.patch(
  '/:username?',
  [userValidator.isUserLoggedIn],
  async (req: Request, res: Response) => {
    const requestingUser = req.query.user as string;
    const user = req.params.username;
    const confirmed = req.query.confirmed as string;
    console.log(requestingUser, user, confirmed);
    if (confirmed) {
      const friend = await FriendCollection.acceptRequest(requestingUser, user);
      res.status(200).json({
        message: 'Your friend request was accepted.',
        friend: util.constructFriendResponse(friend)
      });
    } else {
      const friend = await FriendCollection.rejectRequest(requestingUser, user);
      res.status(200).json({
        message: 'Your friend request was rejected successfully.'
      });
    }
  }
);

/**
 * Remove a friend
 *
 * @name DELETE /api/friend/:username?user=username
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 */
router.delete(
  '/:username?',
  [userValidator.isUserLoggedIn],
  async (req: Request, res: Response) => {
    const requestingUser = req.params.username as string;
    const user = req.query.user as string;
    await FriendCollection.removeFriend(requestingUser, user);
    res.status(200).json({
      message: 'Your friend was removed successfully.'
    });
  }
);

export {router as friendRouter};
