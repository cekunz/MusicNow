import type {HydratedDocument} from 'mongoose';
import type {likedObject} from './model';

type likeResponse = {
  _id: string;
  likedObjectId: string;
  likers: Array<String>;
};

/**
 * Transform a raw likedObject object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<likedObject>} liked - A likedObject
 * @returns {likeResponse} - The likedObject object formatted for the frontend
 */
const constructLikeResponse = (
  liked: HydratedDocument<likedObject>
): likeResponse => {
  const likeCopy: likedObject = {
    ...liked.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  return {
    ...likeCopy,
    _id: likeCopy._id.toString(),
    likers: likeCopy.likers.map((liker) => liker.toString()),
    likedObjectId: likeCopy.object
  };
};

export {constructLikeResponse};
