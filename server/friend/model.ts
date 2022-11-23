import {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Friend
 * DO NOT implement operations here ---> user collection file
 */

// Type definition for Friend on the backend
export type Friend = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: Types.ObjectId; // User object for which the friend object belongs to
  friends: Types.ObjectId[];
  requests: Types.ObjectId[]; // Users that have sent a request to the user of this object
  requested: Types.ObjectId[]; // Users that the user of this object has sent request to
};

export type PopulatedFriend = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: User;
  friends: User[];
  requests: User[];
  requested: User[];
};

// Mongoose schema definition for interfacing with a MongoDB table
// Friends stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FriendSchema = new Schema<Friend>({
  // User for this object
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // Array of all friends of the user
  friends: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }],
  // Array of all friend requests user receives
  requests: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }],
  // Array of all friend requests sent by user
  requested: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }]
});

const FriendModel = model<Friend>('Friend', FriendSchema);
export default FriendModel;