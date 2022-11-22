import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import SongCollection from './collection';

/**
 * Checks if a Song with songTitle and songArtist in req.params exists
 */
const isSongExists = async (req: Request, res: Response, next: NextFunction) => {
  const song = await SongCollection.findOneByTitleAndSong(req.params.songTitle, req.params.songArtist);
  if (!song) {
    res.status(404).json({
      error: `Song with title ${req.params.songTitle} by ${req.params.songArtist} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if a Song with songIdin req.params exists
 */
 const isSongIdExists = async (req: Request, res: Response, next: NextFunction) => {
  const song = await SongCollection.findOne(req.params.songId);
  if (!song) {
    res.status(404).json({
      error: `Song with id ${req.params.songId} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if the content of the freet in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
const isValidSongContent = (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.songTitle.trim()) {
    res.status(400).json({
      error: 'Title content must be at least one character long.'
    });
    return;
  }
  if (!req.params.songArtist.trim()) {
    res.status(400).json({
      error: 'Artist content must be at least one character long.'
    });
    return;
  }

  if (!req.params.trackId.trim()) {
    res.status(400).json({
      error: 'trackId content must be at least one character long.'
    });
    return;
  }

  next();
};

export {
  isValidSongContent,
  isSongExists,
  isSongIdExists
};
