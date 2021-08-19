"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router =  express.Router();


/** GET / => { users: [ {username, first_name, last_name, email, profile_pic, country }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: admin
 **/

router.get("/", ensureLoggedIn, async function (req, res, next) {
    try {
      const users = await User.findAll();
      return res.json({ users });
    } catch (err) {
      return next(err);
    }
  });
/** GET  /[username] => {user}
 * 
 * Returns { username, first_name, last_name, email, profile_pic, country, playlists}
 *   where playlists is { ...playlist_name}
 * 
 * Authorization required: same as user logged in
 */

 router.get("/:username", ensureLoggedIn, async function (req, res, next) {
     try{
         
         const user = await User.get(req.params.username);
         return res.json( {user} );
     } catch(err){
         return next(err);
     }
 });

 /** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { first_name, last_name, password, email , profile_pic, country }
 *
 * Returns { username, first_name, last_name, email, profile_pic, country }
 *
 * Authorization required: admin or same-user-as-:username
 **/

 router.patch("/:username", ensureCorrectUser, async function(req, res, next){
     try{
         const validator = jsonschema.validate(req.body, userUpdateSchema);
         if(!validator.valid){
             const errs = validator.errors.map(e => e.stack);
             throw new BadRequestError(errs);
         }
         const user = await User.update(req.params.username, req.body);
         return res.json({ user });
     } catch (err){
        return next(err);
     }
 });

 /** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: same-user-as-:username
 **/

 router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
     try{
        //console.log("del req params"+req.params);
         await User.remove(req.params.username);

         return res.json({ deleted: req.params.username });
     } catch (err) {
         return next(err);
     }
 });

 

 module.exports = router;