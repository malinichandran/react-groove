"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Video = require("./video.js");
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
    const newVideo = {
        playlist_id: "p1id",
        api_video_id: "v1",
        website: "youtube"
    };

    test("works",  async function (){
        let video = await Video.create(newVideo);
        expect(video).toEqual(newVideo);

        const result = await db.query(
            `SELECT * FROM videos where api_video_id = 'v1'`
        );
        expect(result.rows).toEqual([
            {
                playlist_id: "p1id",
                api_video_id: "v1",
                website: "youtube"
            },
        ]);
    });

    test("bad request with dupe", async function(){
        try{
            await Video.create(newVideo);
            await Video.create(newVideo);
            fail();
        } catch(err){
            expect(Err instanceof BadRequestError).toBeTruthy();
        }
    });
});


  /************************************** remove */
  
  describe("remove", function () {
    test("works", async function () {
      await Video.remove("v1");
      const res = await db.query(
          "SELECT api_video_id FROM videos WHERE api_video_id='v1'");
      expect(res.rows.length).toEqual(0);
    });
  
    test("not found if no such playlist", async function () {
      try {
        await Video.remove("nope");
        fail();
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
  });
  