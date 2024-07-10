const express = require("express");
const mysql = require("mysql2");
const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "parcel"
});

con.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("CONNECTED!");
    }
});

app.get("/fetchbyid/:id", (req, res) => {
    const fetchid = req.params.id;

    con.query("SELECT name FROM mytable WHERE id=?", [fetchid], function(err, result, fields) {
        if (err) {
            console.log(err);
            res.status(500).send(err);  // Send error response if there is an error
        } else {
            res.send(result);
        }
    });
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("On port 3000");
    }
});
