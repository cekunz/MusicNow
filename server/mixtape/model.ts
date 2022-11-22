// import type {Types} from 'mongoose';
// import {Schema, model} from 'mongoose';
// import { User } from '../user/model';

// /**
//  * This file defines the properties stored in a Mixtape
//  * DO NOT implement operations here ---> use collection file
//  */

// // Type definition for User on the backend
// export type Mixtape = {
//   _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
//   songs: Song[]; 
//   prompt: Prompt;
//   creator: User;
// };

// const MixtapeSchema = new Schema({
//   // The user's username
//   songs: {
//     type: Array,
//     required: true
//   },
//   // The user's password
//   prompt: {
//     type: Prompt,
//     required: true
//   },
//   // The date the user joined
//   creator: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'User'
//   }
// });

// const MixtapeModel = model<Mixtape>('User', MixtapeSchema);
// export default MixtapeModel;
