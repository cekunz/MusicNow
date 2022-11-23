import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import { User } from '../user/model';
import type {Song} from '../song/model';

/**
 * This file defines the properties stored in a Mixtape
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type Mixtape = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  songs: Song[]; 
  date: Date;
//   prompt: Prompt;
  creator: string;
};

const MixtapeSchema = new Schema({
  // The user's username
  songs: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  // The user's password
//   prompt: {
//     type: Prompt,
//     required: true
//   },
  // The date the user joined
  creator: {
    type: String,
    required: true,
  }
});

const MixtapeModel = model<Mixtape>('Mixtape', MixtapeSchema);
export default MixtapeModel;
