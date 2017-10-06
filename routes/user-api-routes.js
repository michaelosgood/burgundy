var db = require("../models");

module.exports = function(app) {
    app.get("/api/users/:id", function(req, res) {
        // Find one User with the id in req.params.id and return them to the user with res.json
        db.users.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.post("/api/users", function(req, res) {
        // Create an Author with the data available to us in req.body
        console.log(req.body);
        db.users.create(req.body).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.delete("/api/users/:id", function(req, res) {
        // Delete the Author with the id available to us in req.params.id
        db.users.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

};