"use strict";

const db = require("../db");
const brcypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/**Related functions for users. */

class User {
    /**authenticate user with username, password
     * Returns { username, first_name, last_name, email, profile_pic, country}
     * throws UnauthorizedError is user not found or wrong password
     */
    static async authenticate(username, password) {
        //try to find the user first
        const result = await db.query(
                    `SELECT username,
                            first_name AS "firstName",
                            last_name AS "lastName",
                            email,
                            password,
                            profile_pic,
                            country
                    FROM users
                    WHERE username = $1`,
                    [username],               
        );
        const user = result.rows[0];

        if(user) {
            //compare hashed password to a new hash from password
            const isValid = await brcypt.compare(password, user.password);
            if(isValid === true){
                delete user.password;
                return user;
            } 
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    /**Register user with data.
     * 
     * Returns {username, firstName, lastName, email, profile_pic, country}
     * 
     * throws BadRequestError on duplicates.
     */

     static async register({
          username,
          first_name, 
          last_name, 
          email, 
          password,
          profile_pic,
         country}) {
let result;
console.log("register", profile_pic);
        const duplicateCheck = await db.query(
                `SELECT username 
                 FROM users
                 WHERE username = $1`,
                 [username],  
            );    
        if(duplicateCheck.rows[0]){
            throw new BadRequestError(`Duplicate username: ${username}. Choose a different username`)
        }

        const hashedPassword = await brcypt.hash(password, BCRYPT_WORK_FACTOR);
       if(profile_pic === ' '){
           result = await db.query(
            `INSERT INTO users 
            (username,
              first_name,
              last_name,
              email,
              password,
              country)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username,
                      first_name ,
                      last_name,
                      email,
                      profile_pic,
                      country`,
                  [
                      username,
                      first_name,
                      last_name,
                      email,
                      hashedPassword,
                      country,
                  ],
           )
       }
       else{
         result = await db.query(
            `INSERT INTO users 
              (username,
                first_name,
                last_name,
                email,
                password,
                profile_pic,
                country)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING username,
                        first_name ,
                        last_name,
                        email,
                        profile_pic,
                        country`,
                    [
                        username,
                        first_name,
                        last_name,
                        email,
                        hashedPassword,
                        profile_pic,
                        country,
                    ],
        );

       }
        
        const user = result.rows[0];

        return user;
     }  
     
     /**Find all users.
      * 
      * Returns [{username, first_name,last_name, email, profile_pic, country}, ...]
      * 
      */

      static async findAll(){
          const result = await db.query(
              `SELECT username,
                     first_name AS "firstName",
                     last_name AS "lastName",
                     email,
                     profile_pic,
                     country
                FROM users
                ORDER BY username`,          
         );
         return result.rows;
      }

      /** Given a username, return data about user.
       * 
       * Returns {}
       */
       
       static async get(username) {
           const userRes = await db.query(
               `SELECT username,
                       first_name AS "firstName",
                       last_name AS "lastName",
                       email,
                       profile_pic,
                       country
                FROM users
                WHERE username= $1`,
                [username],
           );

           const user = userRes.rows[0];

           if(!user) throw new NotFoundError(`No user: ${username}`);

           const playlistRes = await db.query(
               `SELECT p.playlist_name
                FROM playlists AS p
                WHERE p.username = $1`,[username]
           );

           user.playlists = playlistRes.rows.map(p => p.playlist_name);
           return user;
       }

/** Update user data with `data`. 
 *  This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email, profile_pic, country}
   *
   * Returns { username, firstName, lastName, email, profile_pic, country }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
*/
   static async update(username, data){
       if(data.password){
           data.password = await brcypt.hash(data.password, BCRYPT_WORK_FACTOR);
       }
      
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
            firstName: "first_name",
            lastName: "last_name",
        });

    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols}
                      WHERE username = ${usernameVarIdx}
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                profile_pic,
                                country`;
     const result = await db.query(querySql, [...values, username]);
     const user = result.rows[0];
     
     if(!user) throw new NotFoundError(`No user: ${username}`);

     delete user.password;
     return user;
   }

   /**Delete given user from database; returns undefined. */

      static async remove(username){
          let result = await db.query(
              `DELETE FROM users
              WHERE username = $1
              RETURNING username`,
              [username],
          );
          const user = result.rows[0];

          if(!user) throw new NotFoundError(`No user: ${username}`);   
      }
}

module.exports = User;