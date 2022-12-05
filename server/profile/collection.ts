import type {HydratedDocument, Types} from 'mongoose';
import SongModel, { Song } from 'server/song/model';
import type {Profile} from './model';
import ProfileModel from './model';
import UserCollection from '../user/collection';
import type { User } from '../user/model';
import FavoriteCollection from '../favorite/collection';
import MixtapeCollection from '../mixtape/collection';
import FriendCollection from '../friend/collection';


/**
 * This files contains a class that has the functionality to explore songs
 * stored in MongoDB, including adding, finding, and deleting songs.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<ProfileCollection> is the output of the ProfileModel() constructor,
 * and contains all the information in Profile. https://mongoosejs.com/docs/typescript.html
 */
class ProfileCollection {
  /**
   * Add a Profile to the collection
   *
   * @param {string} username - The username of the user that the profile belongs to
   * @return {Promise<HydratedDocument<Profile>>} - The newly created profile
   */
  static async addOne(username: string): Promise<HydratedDocument<Profile>> {
    const user  = await UserCollection.findOneByUsername(username);
    const favorites = await FavoriteCollection.findFavoritesByUser(username);
    const mixtapes = await MixtapeCollection.findAllbyCreator(username);
    const friends = await FriendCollection.findFriends(username);
    const friendRequests = await FriendCollection.findFriendRequests(username);
    const profile = new ProfileModel({
      username: username,
      fullName: user.fullName,
      user: user,
      favorites: favorites,
      mixtapes: mixtapes,
      friends: friends,
      friendRequests: friendRequests
    });
    await profile.save(); // Saves mixtape to MongoDB
    return profile;
  }

  /**
   * Get all the profiles in the database
   *
   * @return {Promise<HydratedDocument<Profile>[]>} - An array of all of the profiles
   */
   static async findAll(): Promise<Array<HydratedDocument<Profile>>> {
    return ProfileModel.find({});
  }


  /**
   * Find a profile by username
   *
   * @param {string} username - The username of the desired profile
   * @return {Promise<HydratedDocument<Profile>> | Promise<null> } - The profile of the given user, if any
   */
  static async findOneByUsername(username: string): Promise<HydratedDocument<Profile>> {
    return ProfileModel.findOne({username: username});
  }

  /**
   * Update a user's profile
   *
   * @param {string} username - The username of the desired profile
   * @return {Promise<HydratedDocument<Profile>> | Promise<null> } - The updated profile of the given user, if any
   */
   static async updateOne(username: string): Promise<HydratedDocument<Profile>> {
    const profile = await ProfileModel.findOne({username: username});
    const user: User  = await UserCollection.findOneByUsername(username);
    const favorites = await FavoriteCollection.findFavoritesByUser(username);
    const mixtapes = await MixtapeCollection.findAllbyCreator(username);
    const friends = await FriendCollection.findFriends(username);
    const friendRequests = await FriendCollection.findFriendRequests(username);
    // profile.user = user; // testing keeping the user the same as before
    profile.fullName = user.fullName;
    profile.favorites = favorites;
    profile.mixtapes = mixtapes;
    profile.friends = friends;
    profile.friendRequests = friendRequests;
    await profile.save(); // Saves mixtape to MongoDB
    return profile;
  }


  /**
   * Delete the profile of a given user
   *
   * @param {string} username - The username of user that will have their profile deleted
   * @return {Promise<Boolean>} - true if the profile has been deleted, false otherwise
   */
   static async deleteOneByUsername(username: string): Promise<boolean> {
    const profile = await ProfileModel.deleteOne({username: username});
    return profile !== null;
  }

  
}

export default ProfileCollection;