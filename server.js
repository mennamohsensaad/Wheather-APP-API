// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Initialize all route with a callback function
// Callback function to complete GET '/getTempData'
app.get("/getTempData",(req,res)=>{
     res.send(projectData[projectData.length  -1] )
})

// Post Route
app.post("/SaveTempData",(req,res)=>{
    newData = {
        date :req.body.date,
        temp: req.body.temp,
        content: req.body.content,
        country:req.body.country,
        city:req.body.city,
        whdescription:req.body.whdescription
    }
    projectData.push(newData);
    res.send(projectData);

})
// Setup Server
// Spin up the server
const port = 8080;
const server = app.listen(port, listening);
// Callback to debug
function listening(){
    console.log(`running on localhost: ${port}`);
}
