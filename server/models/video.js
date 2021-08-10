"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for videos */

class Video {
/** Create a video from data, update db, return new video data.
 * 
 * data should be {api_video_id}
 * 
 * Returns { api_video_id, website}
 * 
 * throws BadRequestError if api_video_id already exists in videos table
  */

  static async create(playlist_name, username, api_video_id){
      const videoDuplicateCheck = await db.query(
          `SELECT api_video_id, website, playlist_id
            FROM videos
            WHERE api_video_id = $1`,
            [api_video_id]
      );

      if(videoDuplicateCheck.rows[0])
         return;
        
      const playlist_id = await db.query(
          `SELECT playlist_id FROM playlists
           WHERE playlist_name = $1 
           AND username = $2`,[playlist_name, username]
      );    

      const result = await db.query(
            `INSERT INTO videos 
             api_video_id, playlist_id
             VALUES $1, $2
             RETURNING api_video_id, website`,
             [api_video_id, playlist_id]
      );
      const video = result.rows[0];

      return video;
  }
  
  /** Delete a video from a playlist */
  static async remove(video_id, playlist_name, username){
    const playlist_id = await db.query(
        `SELECT playlist_id FROM playlists
         WHERE playlist_name = $1 
         AND username = $2`,[playlist_name, username]
    );    
      const result = await db.query(
        `DELETE FROM videos 
         WHERE playlist_id = $1 AND api_video_id =$2
         RETURNING playlist_id`,[playlist_id, video_id]
      );
      const video = result.rows[0];

      if(!video) throw new NotFoundError(`No Video Found:`)
  }
}

module.exports = Video;