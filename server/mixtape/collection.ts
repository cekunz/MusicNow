import type {HydratedDocument, Types} from 'mongoose';
import SongModel, { Song } from 'server/song/model';
import type {Mixtape} from './model';
import MixtapeModel from './model';
// import SongModel from './model';

/**
 * This files contains a class that has the functionality to explore songs
 * stored in MongoDB, including adding, finding, and deleting songs.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<MixtapeCollection> is the output of the MixtapeModel() constructor,
 * and contains all the information in Mixtape. https://mongoosejs.com/docs/typescript.html
 */
class MixtapeCollection {
  /**
   * Add a Mixtape to the collection
   *
   * @param {Song} song1 - The first song in the mixtape
   * @param {Song} song2 - The second song in the mixtape
   * @param {Song} song3 - The third song in the mixtape
   * @param {Prompt} prompt - The prompt the mixtape is made for
   * @param {string} username - The username of the creator of the mixtape
   * @return {Promise<HydratedDocument<Song>>} - The newly created song
   */
  static async addOne(song1: Song, song2: Song, song3: Song, username: string, date: Date): Promise<HydratedDocument<Mixtape>> {
    const mixtape = new MixtapeModel({
      songs:[song1, song2, song3],
    //   prompt, 
      creator: username,
      date: date
    });
    await mixtape.save(); // Saves mixtape to MongoDB
    return mixtape;
  }

  /**
   * Get all the m ixtapes in the database
   *
   * @return {Promise<HydratedDocument<Mixtape>[]>} - An array of all of the mixtapes
   */
   static async findAll(): Promise<Array<HydratedDocument<Song>>> {
    // Retrieves all mixtapes
    return MixtapeModel.find({});
  }

  /**
   * Find a mixtape by creator
   *
   * @param {string} username - The username of the creator of the mixtapes
   * @return {Promise<Array<HydratedDocument<Mixtape>>> | Promise<null> } - The mixtapes created by the given user, if any
   */
  static async findAllbyCreator(username: string): Promise<Array<HydratedDocument<Mixtape>>> {
    return MixtapeModel.find({creator: username});
  }


  /**
   * Find a mixtape by date
   *
   * @param {Date} date - The date to search for
   * @return {Promise<Array<HydratedDocument<Mixtape>>> | Promise<null> } - The mixtapes created by the given user, if any
   */
   static async findAllbyDate(date: Date): Promise<Array<HydratedDocument<Mixtape>>> {
    return MixtapeModel.find({date});
  }

  /**
   * Delete a song with given creator and date.
   *
   * @param {string} username - The username of creator of the mixtape to delete
   * @param {Date} date - The date of the mixtape to delete
   * @return {Promise<HydratedDocument<Mixtape>>} - the mixtape in question
   */
   static async findOneByCreatorByDate(username: string, date: Date): Promise<HydratedDocument<Mixtape>> {
    const mixtape = await MixtapeModel.findOne({creator: username, date});
    return mixtape;
  }


  /**
   * Delete a song with given creator and date.
   *
   * @param {string} username - The username of creator of the mixtape to delete
   * @param {Date} date - The date of the mixtape to delete
   * @return {Promise<Boolean>} - true if the song has been deleted, false otherwise
   */
   static async deleteOneByCreatorByDate(username: string, date: Date): Promise<boolean> {
    const mixtape = await MixtapeModel.deleteOne({creator: username, date});
    return mixtape !== null;
  }

  
}

export default MixtapeCollection;
