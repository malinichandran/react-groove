"use strict";

const db = require("../db")
const User = require("../models/user");
const Playlist = require("../models/playlist");
const Video = require("../models/video");
const { createToken } = require("../helpers/tokens");

const playlistIds = [];

async function commonBeforeAll(){
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM playlists");
    await db.query("DELETE FROM videos");

    await User.register(
        {
            username: "u1",
            first_name: "U1F",
            last_name: "U1L",
            email: "user1@user.com",
            password: "password1",
            profile_pic: "pp1",
            country: "US",
        }
    );
    await User.register({
        username: "u2",
        first_name: "U2F",
        last_name: "U2L",
        email: "user2@user.com",
        password: "password2",
        profile_pic: "pp2",
        country: "US",
    });
    await User.register({
        username: "u3",
        first_name: "U3F",
        last_name: "U3L",
        email: "user3@user.com",
        password: "password3",
        profile_pic: "pp3",
        country: "US",
    });
  playlistId[0] = (await Playlist.create({
       username: "u1",
       playlist_name: "pn1",
       description: "d1",
       PUBLIC_PRIVATE_FLAG:false
   })).id;
   playlistId[1] = (await Playlist.create({
    username: "u2",
    playlist_name: "pn2",
    description: "d2",
    PUBLIC_PRIVATE_FLAG:false
})).id;
   playlistId[2] = (await Playlist.create({
    username: "u3",
    playlist_name: "pn3",
    description: "d3",
    PUBLIC_PRIVATE_FLAG:false
})).id;

await Video.create({
    api_video_id: "v1",
    website: "youtube",
    playlist_Id :playlistId[0]
});

await Video.create({
    api_video_id: "v2",
    website: "youtube",
    playlist_Id :playlistId[1]
});

await Video.create({
    api_video_id: "v3",
    website: "youtube",
    playlist_Id :playlistId[2]
});
await Video.create({
    api_video_id: "v4",
    website: "youtube",
    playlist_Id :playlistId[0]
});
await Video.create({
    api_video_id: "v5",
    website: "youtube",
    playlist_Id :playlistId[1]
});
}
async function commonBeforeEach() {
    await db.query("BEGIN");
  }
  
  async function commonAfterEach() {
    await db.query("ROLLBACK");
  }
  
  async function commonAfterAll() {
    await db.end();
  }
  
  const u1Token = createToken({ username: "u1"});
const u2Token = createToken({ username: "u2"});
const u3Token = createToken({ username: "u3"});

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    playlistIds,
    u1Token,
    u2Token,
    u3Token,
  };
  