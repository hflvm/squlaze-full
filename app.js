const express = require('express')
const bodyparser = require('body-parser')
const path = require('path');
const app= express()
//setting middleware
app.use(express.static(__dirname + '/view')); //Serves resources from public folder
// login html
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/view/login.html'));

});

// update
app.get('/updateform', function(request, response) {
	response.sendFile(path.join(__dirname + '/view/update.html'));
});

const geocode = require('./geocode')
//roouter
const userRouter = require('./routers/gigs')
address = "users"
if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, { UserName, Password}) => {
        if (error) {
            return console.log(error)
		}
	
		console.log(UserName)
		console.log(Password)})}
//Gig routes

//app.use(bodyparser.json())
app.use(userRouter)

//app.use(bodyparser.urlencoded({extended : true}));

//server
const PORT = process.env.PORT || 5000
app.listen(PORT,console.log("server started on port "+ PORT))
