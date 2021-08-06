"use strict";

/** Routes for playlists */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureCorrectUser } = require("../middleware/auth");
const Playlist = require("../models/playlist");
const Video = require("../models/video");

const playlistNewSchema = require("../schemas/playlistNew.json");
const playlistUpdateSchema = require("../schemas/playlistUpdate.json");
const videoNewSchema = require("../schemas/videoNew.json");

const router = new express.Router();

/** POST/ {playlist} => {playlist}
 * 
 * playlist should be { username, playlist_name, description, PUBLIC_PRIVATE_KEY }
 * 
 * returns { username, playlist_name, description, PUBLIC_PRIVATE_KEY}
 */

 router.post("/", ensureCorrectUser, async function (req, res, next) {
     try{
         const validator = jsonschema.validate(req.body, playlistNewSchema);
         if(!validator.valid) {
             const errs = validator.errors.map(e => e.stack);
             throw new BadRequestError(errs);
         }

         const playlist = await Playlist.create(req.body);
         return res.status(201).json({ playlist });
     } catch (err) {
         return next(err);
     }
 });

 /** GET all playlists of a  /[username] =>
  * { playlists: [ { username, playlist_name, description, PUBLIC_PRIVATE_KEY }, ...]}
  */

  router.get("/:username", ensureCorrectUser, async function(req, res, next) {
      try{
          const playlists = await Playlist.findAll(req.params.username);
          return res.json({ playlists });
      } catch(err){
           return next(err);
      }
  });

  /** GET all videos of a particular playlist 
   * 
   * /[username]/playlists/[playlist_name] => 
   * {videos : [...api_video_id]}
  */

  router.get("/:playlist_id", ensureCorrectUser, async function(req, res, next) {
      try{
         const videos = await Playlist.getVideos(req.params.playlist_id);
         return res.json({ videos });
      } catch(err) {
        return next(err);
      }
  });

  /** PATCH  /[playlist_name] 
   * {fld1,fld2, ...} => {playlist}
   * 
   * patches playlist data
   * data can include: { playlist_name, description, PUBLIC_PRIVATE_FLAG }
   * 
   * Returns { username, playlist_name,description, PUBLIC_PRIVATE_FLAG }
   *    
  */
 router.patch("/:playlist_name", ensureCorrectUser, async function(req, res, next){
     try{
       const validator =jsonschema.validate(req.body, playlistUpdateSchema);
       if(!validator.valid){
           const errs = validator.errors.map(e => e.stack);
           throw new BadRequestError(errs);
       }
       const playlist = await Playlist.update(req.params.username, req.body);
       return res.json({ playlist });
     } catch(err) {
        return next(err);
     }
 });

 /** DELETE /[playlistlist_name] => { deleted:} */
 router.delete("/:playlist_name", ensureCorrectUser, async function(req, res, next) {
     try{
         await Playlist.remove(req.params.playlist_name);
         return res.json({ deleted: req.params.playlist_name })
     } catch(err) {
         return next(err);
     }
 });

 /**Add a video to a playlist and update the video database
  * 
  *  POST /[playlist_id]/ {video} => {video}
 * 
 * video should be {api_video_id, playlist_id}
 * 
 * returns {api_video_id, playlist_id, website }
 */

 router.post("/:playlist_name", ensureCorrectUser, async function( req, res, next) {
     try{
       const validator = jsonschema.validate(req.body, videoNewSchema);
       if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
      const video = await Video.create(req.body, req.params.playlist_name, username);
      return res.status(201).json({ video });
     } catch(err){
         return next(err);
     }
 })

 /** DELETE video from a playlist. */

 router.delete("/:playlist_name/:username/:video_id", ensureCorrectUser, async function( req, res, next) {
     try{
        await Video.remove(req.params.video_id, req.params.playlist_name, req.params.username);
        return res.json({ deleted: req.params.video_id})
     } catch(err){
         return next(err);
     }
 })
 module.exports = router;
