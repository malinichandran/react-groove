"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  playlistIds,
  u1Token,
  u2Token,
  u3Token
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/*** POST /playlists */

describe("POST /playlists", function(){
  test("works for users",  async function (){
    const resp = await request(app)
              .post("/playlists")
              .send({
                 username : "u1",
                 playlist_name: "p1",
                 description: "d1",
                 PUBLIC_PRIVATE_FLAG: false
              })
              .set("authorization", `Bearer ${u1Tojen}`);
              expect(resp.statusCode).toEqual(201);
              expect(resp.body).toEqual({
                playlist:{
                  username: "u1",
                  playlist_name: "p1",
                  description: "d1",
                  PUBLIC_PRIVATE_FLAG: false
                }, token: expect.any(String),
              });
  });

  test("bad request if missing data", async function () {
    const resp = await request(app)
        .post("/playlists")
        .send({
          username: "u1",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
  
  test("bad request if invalid data", async function () {
    const resp = await request(app)
        .post("/playlists")
        .send({
          username: "u1",
          playlist_name: null,
          description: "d1",
          PUBLIC_PRIVATE_FLAG: false
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************GET /playlists/:username */

describe("GET /playlists/:username", function(){
  test("works for user", async function(){
    const resp = await request(app)
            .get(`/playlists/u1`)
            .set("authorization", `Bearer ${u1Token}`);
            expect(resp.body).toEqual({
              playlists:{
                username: "u1",
                playlist_name: "p1",
                description: "d1",
                PUBLIC_PRIVATE_FLAG: false,
              },
            });
  });

  test("unauth for other users", async function () {
    const resp = await request(app)
        .get(`/playlists/u1`)
        .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .get(`/playlists/u1`);
    expect(resp.statusCode).toEqual(401);
  });

})

/***********************GET videos of a playlist  /playlists/:username/:playlist_name */

describe("GET /playlists/:username/:playlist_name", function(){
  test("works for user", async function(){
    const resp = await request(app)
            .get(`/playlists/u1/p1`)
            .set("authorization", `Bearer ${u1Token}`);
            expect(resp.body).toEqual({
              videos:["v1","v2","v3"]
            });
  });

  test("unauth for other users", async function () {
    const resp = await request(app)
        .get(`/playlists/u1/p1`)
        .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .get(`/playlists/u1/p1`);
    expect(resp.statusCode).toEqual(401);
  });

});

/*********************************PATCH  /playlists/:playlist_name */

test("works for same user", async function () {
  const resp = await request(app)
      .patch(`/playlists/p1`)
      .send({
        playlist_name: "P1"
      })
      .set("authorization", `Bearer ${u1Token}`);
  expect(resp.body).toEqual({
    playlist: {
      username: "u1",
      playlist_name: "P1",
      description: "d1",
      PUBLIC_PRIVATE_FLAG: false
    },
  });
});

test("unauth if not same user", async function () {
  const resp = await request(app)
      .patch(`/playlists/p1`)
      .send({
        playlist_name: "P1"
      })
      .set("authorization", `Bearer ${u2Token}`);
  expect(resp.statusCode).toEqual(401);
});

test("unauth for anon", async function () {
  const resp = await request(app)
      .patch(`/playlists/p1`)
      .send({
        fplaylist_name: "P1"
      });
  expect(resp.statusCode).toEqual(401);
});


/****************************DELETE  /playlists/:playlist_name*/

test("works for same user", async function () {
  const resp = await request(app)
      .delete(`/playlists/p1`)
      .set("authorization", `Bearer ${u1Token}`);
  expect(resp.body).toEqual({ deleted: "p1" });
});

test("unauth if not same user", async function () {
  const resp = await request(app)
      .delete(`/playlists/p1`)
      .set("authorization", `Bearer ${u2Token}`);
  expect(resp.statusCode).toEqual(401);
});

test("unauth for anon", async function () {
  const resp = await request(app)
      .delete(`/playlists/p1`);
  expect(resp.statusCode).toEqual(401);
});



