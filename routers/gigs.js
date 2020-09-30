const express = require('express')
//https://www.apeironsoftware.com/crud-operations-using-sequelize/
const sh1 = require('sha1')
const session = require('express-session');
const User = require("../modules/Gig")
const router = new express.Router();
const bodyparser = require('body-parser')

router.use(bodyparser.urlencoded({extended : true}));

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


//welcome massage
router.get('/home', function(request, response) {
	if (request.session.loggedin) {
    response.send('Welcome back, ' + request.session.username + "----"+request.session.id +'!');
   // response.write('<form action="/updateform" method="GET"> <input type="submit" value= update> </form>');
   //response.write('<p>Write your HTML content here</p>')
   
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

//login
router.post('/login',(req,res) =>{ 
       var username= req.body.username
      var  passwordd= sh1(req.body.password)
User.findAll({
    where: {
      UserName: username,
      Password: passwordd
    }
  }).then((user) => {
    if(user[0].UserName != undefined){
    req.session.loggedin = true;
    req.session.username = username;
console.log("login sucsess" +user)
    res.redirect('/user');
   }
  })
  .catch(err=> res.send("user not exist"))})
      

// git all users
router.get('/users',(req,res) =>
User.findAll()
  .then( users => {
    if (users) {
      res.send(users);
    } else {
      res.status(400).send('Error in insert new record');
    }}))

// insert new user
router.post('/insert',(req, res) =>
   User.create({
    UserName:req.body.userName,
    Password:sh1(req.body.password),
    Email:req.body.email,
    Phone:req.body.Phone,
    Address:req.body.address,
    Date:new Date()
  }).then( users => {
     if (users) {
      res.send(users)
      } else {
       res.status(400).send('Error in insert new record');
      }
  })

)

// update user 
router.post('/update',(req,res) =>{
    id=req.body.id
User.update({ 
  UserName: req.body.userName,
  Password: sh1(req.body.password),
  Email: req.body.email,
  Phone: req.body.Phone,
  Address: req.body.address,},
  { where: {id:id} }
).then((user) => {
  res.send("user updated")
}).catch(function (err) {
      console.log("update failed with error: " + err );
      return 0;
  })}
)

// get one user

router.get('/user',function (req,res) {
if (req.session.loggedin) {
User.findAll({
    where: {
        UserName: req.session.username
    }
  }).then((user) => {
         res.send('<center>'+
         'UserName : '+user[0].UserName + "<br>"+
         'Email :'+user[0].Email + "<br>"+
         'Phone : '+user[0].Phone+ "<br>"+
         'Address :'+user[0].Address+
         '<form action="/updateform" method="GET"> <input type="submit" value= update> </form>'+'</center>')
        })
  .catch(err=> console.log(err))
}else{
  res.send('Please login to view this page!');
}})
      
  // delete user
router.delete('/delete/:id',(req,res) =>
User.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send("user "+req.params.id+" is deleted")
  }).catch(err=> console.log(err))) 


module.exports = router
