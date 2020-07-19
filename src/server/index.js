// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

var path = require('path')
var aylien = require("aylien_textapi");
const dotenv = require('dotenv');
dotenv.config();
console.log(__dirname)

var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
 });

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8083, function () {
    console.log('app listening on port 8083!')
   })

app.post('/test', function (req, res) {
    console.log(`post req.body ${req.body}`);
    textapi.sentiment({
        'text': req.body.formText
        }, function(err, response) {
                if (err) {
                    console.log(err);
                } else {
                    projectData.polarity = response.polarity;
                    projectData.subjectivity = response.subjectivity;
                    projectData.text = response.text;
                    projectData.polarity_confidence = response.polarity_confidence;
                    projectData.subjectivity_confidence = response.subjectivity_confidence;
                    res.send(projectData)
                    console.log(`post projectData ${projectData}`);
                }
        });
})
