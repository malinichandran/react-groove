const db =  require("../db");
const { BadRequestError, NotFoundError } =  require("../expressError");
const { sqlForPartialUpdate } =  require("../helpers/sql");

/** Related functions for playlists */

class Playlist {
    /** Create a playlist from data, update db, return new company data.
     * 
     * data should be { username, playlist_name, description, PUBLIC_PRIVATE_FLAG}
     * 
     * Returns { username, playlist_name, description, PUBLIC_PRIVATE_FLAG}
     * 
     * throws BadRequestError if playlist_name already exists in users playlist
     */

     static async create( { username, playlist_name, description, PUBLIC_PRIVATE_FLAG }){
         const playlistDuplicateCheck = await db.query(
                    `SELECT playlist_name 
                     FROM playlists
                     WHERE username = $1 and playlist_name = $2`,
                     [username, playlist_name]
         );

         if(playlistDuplicateCheck.rows[0])
            throw BadRequestError(`Duplicate playlist: ${playlist_name}. Choose another name.`);

            const result = await db.query(
                    `INSERT INTO playlists 
                     (username, playlist_name, PUBLIC_PRIVATE_FLAG)
                     VALUES ($1, $2, $3, $4)
                     RETURNING username, playlist_name, description, PUBLIC_PRIVATE_FLAG`,
                     [ username, playlist_name, description,PUBLIC_PRIVATE_FLAG],
            );

            const playlist = result.rows[0];
            
            return playlist;
     }

    /** Find all playlists of a user */

    static async findAll(username){
        const playlistsRes = await db.query(
            `SELECT username, 
             playlist_name, 
             description,
             PUBLIC_PRIVATE_FLAG
             FROM playlists
             WHERE username = $1`,
             [username] 
        );

        const playlists = playlistsRes.rows;
        
        return playlists;
    }
    
    /** Given a playlist_name, return videos in that playlist
     * 
     * 
     */
    static async getVideos(playlist_name, username){
        playlist_id =  await db.query(
                        `SELECT id from playlists 
                         WHERE playlist_name = $1
                         AND username = $2`,
                         [playlist_name, username]
        );
       const videoRes = await db.query(
              `SELECT api_video_id
               FROM videos
               WHERE playlist_id = $1`,
               [playlist_id]
       );

          const videos = videoRes.rows;

          return videos;
           }
    
     /** Update playlist data with 'data .
      * 
      * This is a partial update- it is fine if data doesnt contain all the 
      * fields; this only changes provided ones.
      * 
      * data can include: { playlist_name, description, PUBLIC_PRIVATE_FLAG }
      * 
      * Returns { username, playlist_name,description, PUBLIC_PRIVATE_FLAG }
      * 
      * Throws NotFoundError if not found.
     */

     static async update(playlist_name, data){
         const { setCols, values } = sqlForPartialUpdate(
             data,
             {
                 playlist_name: "playlist_name",
                 PUBLIC_PRIVATE_FLAG: "PUBLIC_PRIVATE_FLAG",
             }
         );
         const handleVarIdx = "$" + (values.length + 1);

         const querySql = `UPDATE playlists
                            SET ${setCols}
                            WHERE playlist_name = ${handleVarIdx}
                            RETURNING username,
                                      playlist_name,
                                      description,
                                      PUBLIC_PRIVATE_FLAG`;

        const result = await db.query(querySql, [...values, playlist_name]);
        const playlist = reault.rows[0];

        if(!playlist) throw new NotFoundError(`No Playlist: ${playlist_name}`);

        return playlist;
     }

     /** Delete a playlist from datatbase: returns undefined
      * 
      * throws NotFoundError if playlist not found.
      */
     static async remove(playlist_name){
         const result = await db.query(
             `DELETE FROM playlists
              WHERE playlist_name = $1
              RETURNING playlist_name`,
              [playlist_name]
         );

         const playlist = result.rows[0];

         if(!playlist) throw new NotFoundError(`No Playlist: ${playlist_name}`);
     }
}

module.exports = Playlist;