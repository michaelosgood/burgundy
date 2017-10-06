var db = require("../models");

module.exports = function(app) {

  // GET route for retrieving all posts
  app.get("/api/posts", function(req, res) {
    db.posts.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // GET route for getting all of the posts by a user
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.userName) {
      query.UserName = req.query.userName;
    }
    db.posts.findAll({
      where: query
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    db.posts.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });

  // Get rotue for retrieving posts by a category
  //<=============Double-check the parameters for below once connected to localhost=======>
  app.get("/api/posts/:category", function(req, res) {
    db.posts.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });
  //<=============Double-check the parameters for above once connected to localhost=======>

  // POST route for creating a new post
  app.post("/api/posts", function(req, res) {
    db.posts.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.posts.destroy({
       where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.posts.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
        res.json(dbPost);
      });
  });
};