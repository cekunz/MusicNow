import type {HydratedDocument, Types} from "mongoose";
import type {User} from '../user/model';
import type {Friend} from './model';
import FriendModel from './model';
import UserCollection from "../user/collection";

/**
 * This file contains a class that has the functionality to explore friends
 * stored in MongoDB, including sending requests, accepting requests, adding and removing friends.
 * Feel free to add additional operations in this file.
 * 
 * Note: HydratedDocument<Friend> is the output of the FriendModel() constructor,
 * and contains all the information in Friend. https://mongoosejs.com/docs/typescript.html
 */
class FriendCollection {
  /**
   * Add a friend object to the collection.
   * 
   * @param {User} user - The user of the object
   * @param {Promise<HydratedDocument<Friend>>} - The newly created friend object
   */
  static async addOne(user: User): Promise<HydratedDocument<Friend>> {
    const newFriend = new FriendModel({
      user: user,
      friends: [],
      requests: [],
      requested: []
    });

    await newFriend.save(); // Saves friend object to MongoDB
    return newFriend;
  }

  /**
   * Remove a friend object from the collection.
   * 
   * @param {string} userID - the userID of the current user to be deleted
   * @return {Promise<Boolean>} - True if user succesfully deleted, else False
   */
  static async deleteOne(userID: string): Promise<Boolean> {
    const removedFriend = await FriendModel.deleteOne({user: userID});

    await FriendModel.updateMany({friends: [userID]}, {
      $pullAll: {
        friends: [userID]
      }
    });
    await FriendModel.updateMany({requests: [userID]}, {
      $pullAll: {
        requests: [userID]
      }
    });
    await FriendModel.updateMany({requested: [userID]}, {
      $pullAll: {
        requested: [userID]
      }
    });

    return removedFriend['acknowledged'] == true && removedFriend['deletedCount'] == 1;
  }
}

export default FriendCollection;