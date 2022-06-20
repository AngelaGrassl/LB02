/*
Thema: Registration server
Einfacher Server, um Benutzer zu registrieren
Der Server dient zu Übung zur Validierung von Benutzereingaben im Backend.
 */

'use strict';

let express = require("express");
let bodyParser = require("body-parser");
let app     = express();
const { v4: uuidv4 } = require('uuid');
const UserRepository = require('./UserRepository');
const Validation = require('./ValidationService');


const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Running at Port ${port}`);
server.timeout = 1000 * 60 * 2; // 2 minutes

//Warning: Korrekt setzen!!
const staticPath = './12b_validation_server/03_Solutions/register-server-02/data/';
const registrationFile = staticPath+'registration.json';


// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.header('Content-Type', 'application/json');
    next();
});


//test uuid
app.get('/test1', (req, res) => {
    const id = uuidv4();
    res.send(id);
});



// necessary for posting data
// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

/*  1. Writing to file
    https://stackabuse.com/reading-and-writing-json-files-with-node-js/
 */

app.post('/register', (req, res) => {

    const HTTP_STATUS_NO_ACCEPTABLE = 406;
    //Daten des Posts-Requests auslesen und zusätzlich eine User-id erzeugen

    /* Aufgabe 1
        a: Fügen Sie Eingabefelder für Vor- und Nachname hinzu
        b: Fügen Sie ein Eingabefeld für eine Telefonnummer hinzu
        c: Fügen Sie ein weiteres Passwortfeld (zur Bestätigung des
            ersten Passworts) hinzu
     */
    let userObj = {
        "id": uuidv4(),
        "username": req.body.user.username,
        "firstname": req.body.user.firstname,
        "lastname": req.body.user.lastname,
        "email": req.body.user.email,
        "password": req.body.user.password
    }

    let result = Validation.validateUser(userObj);
    if (result.isNotValid) {
        res.status(HTTP_STATUS_NO_ACCEPTABLE).send(result.msg);
    } else {
        //Speicherung des neuen Benutzers
        let userRepo = new UserRepository(registrationFile);
        userRepo.read()
            .then((data) => {
                //log data for analysis
                console.log(userObj);
                data.push(userObj);
                return data;
            })
            .then(data => userRepo.save(data))
            .catch(error => {
                console.error(error);
            });
        res.status(201).send(`User ${userObj.username} inserted!`);
    }
});

