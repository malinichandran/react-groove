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

  static async create(username, playlist_name, { api_video_id, website }) {
    const playlistRes = await db.query(
      `SELECT id FROM playlists
           WHERE playlist_name = $1 
           AND username = $2`,
      [playlist_name, username]
    );
    const playlist_id = playlistRes.rows[0].id;

    const videoDuplicateCheck = await db.query(
      `SELECT api_video_id, website, playlist_id
        FROM videos
        WHERE api_video_id = $1 AND playlist_id = $2`,
      [api_video_id, playlist_id]
    );

    if (videoDuplicateCheck.rows[0]) return;

    const result = await db.query(
      `INSERT INTO videos 
             (api_video_id, website, playlist_id)
             VALUES ($1, $2, $3)
             RETURNING api_video_id, website`,
      [api_video_id, website, playlist_id]
    );
    const video = result.rows[0];

    return video;
  }

  /** Delete a video from a playlist */
  static async remove(username, playlist_name, videoId) {
    const playlistRes = await db.query(
      `SELECT id FROM playlists
         WHERE username = $1 
         AND playlist_name = $2`,
      [username, playlist_name]
    );
    let playlist_id = playlistRes.rows[0].id;

    const result = await db.query(
      `DELETE FROM videos 
         WHERE api_video_id = $1 AND playlist_id =$2
         RETURNING playlist_id`,
      [videoId, playlist_id]
    );
    const video = result.rows[0];

    if (!result) throw new NotFoundError(`No Video Found:`);
  }
}

module.exports = Video;
