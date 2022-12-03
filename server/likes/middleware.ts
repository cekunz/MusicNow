import type {Request, Response, NextFunction} from 'express';
import likedObjectCollection from './collection';

/**
 * Checks if a Like with id in req.params exists
 */
const isLikedExists = async (req: Request, res: Response, next: NextFunction) => {
  const liked = await likedObjectCollection.findOne(req.body.id);
  if (!liked) {
    res.status(404).json({
      error: `Liked object with id ${req.body.id} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if a Like with id in req.params doesn't exist
 */
const isLikedDoesntExist = async (req: Request, res: Response, next: NextFunction) => {
    const liked = await likedObjectCollection.findOne(req.body.id);
    if (liked) {
        res.status(403).json({
        error: `Liked object with id ${req.body.id} already exists.`
        });
        return;
    }

    next();
};

export {
    isLikedExists, isLikedDoesntExist
  };