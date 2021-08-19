"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Playlist = require("./playlist.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  playlistIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */
describe("create", function(){
    const newPlaylist = {
        username: "u1",
        playlist_name: "newp1",
        description: "d1",
        PUBLIC_PRIVATE_FLAG:true
    };

    test("works",  async function (){
        let playlist = await Playlist.create(newPlaylist);
        expect(playlist).toEqual(newPlaylist);

        const result = await db.query(
            `SELECT * FROM playlists where playlist_name = 'newp1'`
        );
        expect(result.rows).toEqual([
            {
                username: "u1",
        playlist_name: "newp1",
        description: "d1",
        PUBLIC_PRIVATE_FLAG:true
            },
        ]);
    });

    test("bad request with dupe", async function(){
        try{
            await Playlist.create(newPlaylist);
            await Playlist.create(newPlaylist);
            fail();
        } catch(err){
            expect(Err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/************************************** update */

describe("update", function () {
    const updateData = {
      playlist_name: "New",
      description: "New Description",
      
    };
  
    test("works", async function () {
      let Playlist = await Playlist.update("p1", updateData);
      expect(Playlist).toEqual({
        playlist_name:"p1",
        ...updateData,
      });
  
      const result = await db.query(
            `SELECT *
             FROM playlists
             WHERE playlist_name = 'p1'`);
      expect(result.rows).toEqual([{
        username: "u1",
        playlist_name: "New",
        description: "New Description",
        PUBLIC_PRIVATE_FLAG: true
      }]);
    });
  
    
  
    test("not found if no such playlist", async function () {
      try {
        await Playlist.update("nope", updateData);
        fail();
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
  
    test("bad request with no data", async function () {
      try {
        await Playlist.update("p1", {});
        fail();
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy();
      }
    });
  });
  
  /************************************** remove */
  
  describe("remove", function () {
    test("works", async function () {
      await Playlist.remove("p1");
      const res = await db.query(
          "SELECT playlist_name FROM playlists WHERE playlist_name='c1'");
      expect(res.rows.length).toEqual(0);
    });
  
    test("not found if no such playlist", async function () {
      try {
        await Playlist.remove("nope");
        fail();
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
  });
  