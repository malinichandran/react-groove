"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const Follows = require("../models/follow");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router =  express.Router();

// /*** POST / {user} => {user,token}
//  * Adds a new user and updates database.
//  * This returns the newly created user and an authentication token for them:
//  *  {user: { username, first_name, last_name, email, profile_pic, country }, token }
//  */
// router.post("/", ensureLoggedIn, async function(req, res, next) {
//     try{
//      const validator = jsonschema.validate(req.body, userNewSchema);
//      if (!validator.valid) {
//         const errs = validator.errors.map(e => e.stack);
//         throw new BadRequestError(errs);
//       }
//       const user = await User.register(req.body);
//       const token = createToken(user);
//       return res.status(201).json({ user, token });
//     } catch(err){
//         return next(err);
//     }
// })

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
 * Authorization required: admin or same-user-as-:username
 **/

 router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
     try{
         await User.remove(req.params.username);
         return res.json({ deleted: req.params.username });
     } catch (err) {
         return next(err);
     }
 });

 /**User Routes for followers */

router.get("/:username/followers", ensureLoggedIn, async function(req, res, next){
    try {
        const followers = await Follows.getFollowers(res.locals.user.id)
        return res.json({ followers })
    } catch (err) {
        return next(err)
    }
})

router.get("/:username/following", ensureLoggedIn, async function(req, res, next){
    try {
        const following = await Follows.getFollowing(res.locals.user.id)
        return res.json({ following })
    } catch (err) {
        return next(err)
    }
})

router.post("/:username/follow", ensureCorrectUser, async function(req, res, next){
    try {
        const { id } = req.body;
        const newFollow = await Follows.addFollows(res.locals.user.id, id)
        return res.json({ newFollow })
    } catch (err) {
        return next(err)
    }
})

router.delete("/:username/follow", ensureCorrectUser, async function(req, res, next){
    try {
        const { id } = req.body;
        const delFollow = await Follows.stopFollowing(res.locals.user.id, id)
    
        return res.json({ delFollow })
    } catch (err) {
        return next(err)
    }
})


 module.exports = router;