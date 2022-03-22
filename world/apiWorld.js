var config = require("../config");
var pgp = require("pg-promise")();
var db = pgp(config.getDbConnectionString());
module.exports = function (app) {

    //näidata kõiki riike
    app.get("/api/country", function (req, res) {
        db.any(
            "SELECT country.name " +
            "FROM country " +
            "ORDER BY country.name ASC"
            )
            .then(function (data) {
                res.json({
                    status: "success",
                    data: data,
                });
            })
            .catch((err) => {
                res.json({
                    description: "Can’t find any country",
                    error: err,
                });
            });
    });

    //näidata kõiki määratud mandri riike (riigi nimi, pealinn) 
    app.get("/api/:continent/continent/", function (req, res) {
        db.any(
            "SELECT country.name AS country, city.name AS capital " +
            "FROM country INNER JOIN city ON country.capital = city.id " +
            "WHERE country.continent = '" + req.params.continent + "'"
            )
            .then(function (data) {
                res.json({
                    status: "success",
                    data: data,
                });
            })
            .catch((err) => {
                res.json({
                    description: "Can’t find any continental country",
                    error: err,
                });
            });
    });

    //näidata täielikku teavet määratud linna kohta (2 GET - päringut: linnakoodi ja nime järgi) 

    //linnakoodi järgi
    app.get("/api/:citycode/citycode/", function (req, res) {
        db.any(
            "SELECT id, name, countrycode, district, population " +
            "FROM  city " +
            "WHERE countrycode = '" + req.params.citycode + "'"
            )
            .then(function (data) {
                res.json({
                    status: "success",
                    data: data,
                });
            })
            .catch((err) => {
                res.json({
                    description: "Can’t find any city",
                    error: err,
                });
            });
    });

    //linna nime järgi
    app.get("/api/:cityname/cityname", function (req, res) {
        db.any(
            "SELECT id, name, countrycode, district, population " +
            "FROM city " +
            "WHERE name = '" + req.params.cityname + "'"
            )
            .then(function (data) {
                res.json({
                    status: "success",
                    data: data,
                });
            })
            .catch((err) => {
                res.json({
                    description: "Can’t find any city",
                    error: err,
                });
            });
    });

    //näidata täielikku teavet määratud riigi kohta (teave riigi ja linnade kohta). Andmete lugemiseks looge ka 2 päringut: 
    //riigi koodi ja nime järgi. 

    //riigi koodi järgi
    app.get("/api/:countrycode/countrycode", function (req, res) {
        db.any(
            "SELECT * " +
            "FROM country INNER JOIN city ON city.countrycode = country.code " +
            "WHERE country.code = '" + req.params.countrycode + "'" +
            "ORDER BY city.name ASC"
            )
            .then(function (data) {
                res.json({
                    status: "success",
                    data: data,
                });
            })
            .catch((err) => {
                res.json({
                    description: "Can’t find any city",
                    error: err,
                });
            });
    });


    //riigi nime järgi
    app.get("/api/:countryname/countryname", function (req, res) {
        db.any(
            "SELECT * " +
            "FROM country INNER JOIN city ON city.countrycode = country.code " +
            "WHERE country.name = '" + req.params.countryname + "'" +
            "ORDER BY city.name ASC"
            )
            .then(function (data) {
                res.json({
                    status: "success",
                    data: data,
                });
            })
            .catch((err) => {
                res.json({
                    description: "Can’t find any city",
                    error: err,
                });
            });
    });

};