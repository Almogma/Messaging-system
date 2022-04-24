const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes.js")
const port = process.env.PORT || 3000 // using the env port or 3000 for local runs.
const app = express();
app.use(express.json());

// All the information of login into mongodb user.
const username = "almog610";
const password = "Almog153284a";
const clustername = "cluster0";
const dbname = "myFirstDatabase";

// Connect mongodb with the given url that mongodb gave.
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://almog610:Almog153284a@cluster0.vemhf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully"); // The connection is succeed.
});

// middleware 
app.use(Router);

// listen to every action that running on the specific port.
app.listen(port, () => {
  console.log("Server is running at port 3000");
});