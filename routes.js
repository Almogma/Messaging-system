const express = require("express"); // require the express module
const app = express();
const Msg = require("./models"); // require modles.js file
const User = require("./users") // require users.js file
const verifyToken = require('./verifyToken'); // require verifyToken.js file
const verifyUserName = require('./verifyUserName'); // require verifyUserName file
const bcrypt = require('bcryptjs'); // require bcryptjs module for encryption
const jwt = require('jsonwebtoken'); // require jsonwebtoken module for encryption
const JWT_SECRET = 'sdjkfh8fdsdhasdajdksbfma@#*(&@*!^#&jhj5431bhjdsfg839ujkdhfjk'; // JWT secret key

// POST Method - register an user into the system.
app.post("/register", async (request, response) => {
	const { username, password: plainTextPassword } = request.body // The parameters that have sent trough the body.

  // Checks if the username is not a string type.
	if (!username || typeof username !== 'string') {
		return response.json({ status: 'error', error: 'Invalid username' })
	}
  // Check if the password is not a string type.
	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return response.json({ status: 'error', error: 'Invalid password' })
	}
  // Check if password is too small.
	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}
  // encrypt the password with bcrypt module.
	const password = await bcrypt.hash(plainTextPassword, 10)

  // Creating a new data with the username and password that was entered and keeps this data in the database.
	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response) 
	} catch (error) {
		if (error.code === 11000) {
			// Will return error if the username is already taken.
			return response.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}
  // Will return status code 'ok' if the register was done with no errors.
	response.json({ status: 'ok' })
  });

// POST Method - login an existing user into the system.
app.post("/login", async(request, response) =>{

  // Insert the data into variables.
  const { username, password} = request.body;
  const user = await User.findOne( { username }).lean(); // find the username that was entered.

  // Check if the username that was entered is exists. if no then return an error message.
  if(!user){
    return response.json({ status: 'error', error: 'Invalid username/password'})
  }

  // Checks if the username and the password exists in the database. if it is then it generate a new Token with
  // my secret key.
  if(await bcrypt.compare(password, user.password)){
    // the username, password combination is successful.

    const token = jwt.sign({
       id: user._id,
      username: user.username
    }, JWT_SECRET )

    // return the token that was genrated.
    return response.header('auth-token', token).send(token)
  }
  // else return error message.
  response.json({ status:'error', error: 'Invalid username/password'});

});
  
// POST Method - writing message from a specific user.
// First validate the token with the secert key, Then verify the username within the token with the name that 
// was entred in the url.
app.post("/write_message/:name", verifyToken, verifyUserName, async (request, response) => {
    // Writing into the database the message.
    const msg = new Msg(request.body);
  
    try {
      await msg.save(); //saving the message
      response.send(msg); //display the message
    } catch (error) {
      response.status(500).send(error); //display an error message
    }
});

// GET Method - Display an msg that confirmed that you have logged into the system with correct user.
// First validate the token with the secert key, Then verify the username within the token with the name that 
// was entred in the url.
app.get("/:name", verifyToken, verifyUserName, async (request, response) => {
  try {
    var name = request.params.name;
    response.send("Welcome to the Message System!! \n You are logged into the system as " + name)
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET Method - Display an meesage that shows that you are into the messages system.
app.get("/", async (request, response) => {
  try {
    return response.send("Welcome to the Message System!!")

  } catch (error) {
    response.status(500).send(error);
  }
});

// GET Method - will get all the messages that the username include in the sender or in the receiver.
// First validate the token with the secert key, Then verify the username within the token with the name that 
// was entred in the url.
app.get("/all_messages/:name", verifyToken, verifyUserName,  async (request, response) => {
    var name = request.params.name;
    const users = await Msg.find({ $or: [ { Sender: name, Recevier: name  }]}); // find all the messages that contain the name that has been sent in the Sender title or Receivier title.
  
    try {
      response.send(users); // if found any, will display into the screen.
    } catch (error) {
      response.status(500).send(error); // will display error if something happens.
    }
});

// GET Method - will get all the messages that the user has been sent and thier status is unread.
// First validate the token with the secert key, Then verify the username within the token with the name that 
// was entred in the url.
app.get("/unread_messages/:name", verifyToken, verifyUserName, async (request, response) => {
    var name = request.params.name;
    const users = await Msg.find({ Sender: name, UnReadMSG: "false"}); // find all the messages that the name include in the sender and the status of the messages is unread.
  
    try {
      response.send(users);// if found any, will display into the screen.
    } catch (error) {
      response.status(500).send(error);// will display error if something happens.
    }
});

// PUT Method - will search message by the username that has unread and turn this message into read status.
// First validate the token with the secert key, Then verify the username within the token with the name that 
// was entred in the url.
app.put("/read_message/:name", verifyToken, verifyUserName, async (request, response) => {
    var name = request.params.name;
    const filter = { Sender: name, UnReadMSG: "false"}; // find all the messages that the name include in the sender and the status of the messages is unread.
    const update = {UnReadMSG: "true"} // update the field to true.
    const users = await Msg.findOneAndUpdate(filter, update,{
        new: true,
        upsert: true // Keep the changes.
      });
    try {
      response.send(users); // will display the message that has been changed.
    } catch (error) {
      response.status(500).send(error); // will display an error is there is any.
    }
});

// DELETE Method - will delete message that the contain the username in Sender field.
// First validate the token with the secert key, Then verify the username within the token with the name that 
// was entred in the url.
app.delete("/delete_message/:name", verifyToken, verifyUserName, async (request, response) => {
    var name = request.params.name;
    const users = await Msg.findOneAndDelete({ $or:[ {Sender: name}, {Recevier : name}], // find one message that contain the name that has been sent in the Sender title or Receivier title and delete it.
        new: true,
        upsert: true
    }) // Keep the changes.});
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
});

module.exports = app;