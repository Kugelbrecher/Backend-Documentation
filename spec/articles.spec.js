/*
 * Test suite for articles
 */
require("es6-promise").polyfill();
require("isomorphic-fetch");

const url = (path) => `http://localhost:3000${path}`;

describe("Validate Article functionality", () => {

  console.log("articles.spec");

  let cookie;

  it("register new user", (done) => {
    let regUser = { username: "mrj3", password: "1234" };
    fetch(url("/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regUser),
    })
      .then((res) => res.json())
      .then((res) => {
        expect(res.username).toEqual("mrj3");
        expect(res.result).toEqual("success");
        done();
      });
  });

  it("login user", (done) => {
    let loginUser = { username: "mrj3", password: "1234" };
    fetch(url("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    })
      .then((res) => {
        cookie = res.headers.get("set-cookie");
        return res.json();
      })
      .then((res) => {
        expect(res.username).toEqual("mrj3");
        expect(res.result).toEqual("success");
        done();
      });
  });

  it("should give me three or more articles", (done) => {
    fetch(url("/articles"), {
      method: "GET",
      headers: { "Content-Type": "application/json", cookie: cookie },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res instanceof Array) expect(res.length).toBeGreaterThan(2);
        done();
      });
  });

  it("should add new article with successive article id, return list of articles with new article", (done) => {
    // add a new article
    // verify you get the articles back with new article
    // verify the id, author, content of the new article
    let post = { author: "Tom", body: "A new post" };
    fetch(url("/article"), {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie: cookie },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res instanceof Array) {
          //TODO test new article expected id, author, post
          var last = res[res.length - 1];
          expect(last.id).toBe(res.length - 1);
          expect(last.author).toEqual("Tom");
          expect(last.body).toEqual("A new post");
        }
        done();
      });
  });

  it("should return an article with a specified id", (done) => {
    //call GET /articles/id with the chosen id
    // validate that the correct article is returned
    //TODO test article expected id, author, post
    fetch(url("/articles/2"), {
      method: "GET",
      headers: { "Content-Type": "application/json", cookie: cookie },
    })
      .then((res) => res.json())
      .then((res) => {
        expect(res.id).toEqual(2);
        expect(res.author).toEqual("Zack");
        expect(res.body).toEqual("Post 3");
        done();
      });
  });
});