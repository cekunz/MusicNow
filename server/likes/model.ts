import {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties of a liked object
 */

export type likedObject = {
    _id: Types.ObjectId;
    object: string;
    likers: Types.Array<string>;
}

const likeSchema = new Schema({
    object: {
        type: String,
        required: true,

    },
    likers: {
        type: Array,
        required: true
    }
});

const LikeModel = model<likedObject>('Likes', likeSchema);
export default LikeModel;