import type {Request, Response, NextFunction} from 'express';
import likedObjectCollection from './collection';

/**
 * Checks if a Like with id in req.params or req.body exists
 */
const isLikedExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const likedObjectId = req.params.id ?? (req.body.id as string);
  const liked = await likedObjectCollection.findOne(likedObjectId);
  if (!liked) {
    res.status(404).json({
      error: `Liked object with id ${req.params.id} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if a Like with id in req.params doesn't exist
 */
const isLikedDoesntExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const likedObjectId = req.params.id ?? (req.body.id as string);
  const liked = await likedObjectCollection.findOne(likedObjectId);

  if (liked) {
    res.status(403).json({
      error: `Liked object with id ${req.params.id} already exists.`
    });
    return;
  }

  next();
};

export {isLikedExists, isLikedDoesntExist};
