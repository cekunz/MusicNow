import type {Request, Response, NextFunction} from 'express';
import ProfileCollection from './collection';

/**
 * Checks if a Mixtape with creator and date in req.params exists
 */
const isProfileExists = async (req: Request, res: Response, next: NextFunction) => {
  const profile = await ProfileCollection.findOneByUsername(req.params.username);
  if (!profile) {
    res.status(404).json({
      error: `Profile for user with username ${req.params.username} does not exist.`
    });
    return;
  }

  next();
};

export {
    isProfileExists,
  };