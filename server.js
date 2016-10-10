// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();

var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));

// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})





// below code is to save users without sessions
var users=[];
var messages=[];


// to check if user is in the array
var is_user=function(user){
	var users_count=users.length;
	for(var i=0; i<users_count;i++){
		if(user==users[i]){
			return true;
		}
	}
	return false;
}















// 
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require("socket.io").listen(server)

io.sockets.on("connection", function(socket){
	socket.on("page_load",function(data){
		// to check if the data that is being passed from page load
		//equals to true.. using above function
		if(is_user(data.user) === true){
			// it will send message only to user requesting to enter
			// that this user already exist
			socket.emit("existing_user",{error:"This user already exists"});
		}
		else{
			users.push(data.user);
			// below will load all messages of the chat log
			socket.emit("load_messages",{current_user:data.user, messages:messages})
		}
	});

	socket.on("new_message",function(data){
		messages.push({name:data.user, message:data.message});
		io.emit("post_new_message",{new_message: data.message, user:data.user});
	});
});












