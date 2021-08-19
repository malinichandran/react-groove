const bcrypt = require("bcrypt");

const db = require("../db.js");
const {BCRYPT_WORK_FACTOR} = require("../config");

const playlistIds = [];

async function commonBeforeAll(){
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM playlists");
    await db.query("DELETE FROM videos")

    await db.query(`
       INSERT INTO playlists(username, playlist_name, description, PUBLIC_PRIVATE_FLAG)
       VALUES ('u1, 'p1', 'd1', false),
              ('u1', 'p2', 'd2', true),
              ('u1', 'p3', 'd3', true)`);

    await db.query(`
         INSERT INTO users(username,
                            first_name,
                            last_name,
                            email,
                            password,
                            profile_pic,
                            country)
        VALUES ('u1', 'uf1', 'ul1', 'u1@email.com', $1, 'http://c1.img', 'USA'),
        ('u2', 'uf2', 'ul2', 'u2@email.com', $1, 'http://c1.img', 'USA')
        RETURNING username`,
        [await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
         await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
        ]);

    await db.query(`
        INSERT INTO videos(playlist_id, api_video_id)
        VALUES ('p1id', 'v1')`,
                ('p2id', 'v2')
        );
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
      
      
      module.exports = {
        commonBeforeAll,
        commonBeforeEach,
        commonAfterEach,
        commonAfterAll,
        testJobIds,
      };