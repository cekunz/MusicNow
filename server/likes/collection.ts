import type { HydratedDocument, Types} from "mongoose";
import LikeModel from "./model";
import type { likedObject } from "./model";

/**
 * This class contains the functionality to explore likedObjects in MongoDB, including
 * adding objects, adding and removing likes, finding an object, and deleting an object 
 */
class likedObjectCollection {
    /**
     * create a new liked object
     * 
     * @param objectid the ID of the object being liked 
     * @param likers optional, list of users liking the object, empty array by default
     * @returns {Promise<HydratedDocument<likedObject>>} - the new liked object
     */
    static async addOne(objectId: Types.ObjectId | string, likers : Types.ObjectId[] = []): Promise<HydratedDocument<likedObject>> {
        const liked = new LikeModel({object: objectId, likers: likers})
        await liked.save(); // Saves likedObject to MongoDB
        return liked;
      }

    /**
     * update a liked object with a user to either add or remove
     * 
     * @param objectid the id of the object being updated
     * @param user the id of the user being updated for the object
     * @param remove true if the user is being removed from the likers, false if being added
     * @returns {Promise<HydratedDocument<likedObject>>} - the updated liked object
     */
    static async updateOne(objectId : Types.ObjectId | string, user: string, remove: boolean): Promise<HydratedDocument<likedObject>>{
        const object = await LikeModel.findOne({object: objectId});
        const likers = object.likers;
        if (remove){
            if (likers.includes(user)){
                likers.splice(likers.indexOf(user), 1);
            }
        } else {
            if (!likers.includes(user)){
                likers.push(user);
            }
        }
        object.likers = likers;
        await object.save();
        return object;
    }

    /**
     * find a liked object by id
     * 
     * @param object the id of the object to find
     * @returns {Promise<HydratedDocument<likedObject>>} - the object with the given id
     */
    static async findOne(objectId : Types.ObjectId | string): Promise<HydratedDocument<likedObject>>{
        return LikeModel.findOne({object: objectId});
    }

    /**
     * 
     * @param object the id of the object to delete
     * @returns {boolean} true if the object was deleted
     */
    static async deleteOne(objectId: Types.ObjectId | string): Promise<boolean>{
        const deletedObject = await LikeModel.deleteOne({object: objectId});
        return deletedObject !== null;
    }
}

export default likedObjectCollection;