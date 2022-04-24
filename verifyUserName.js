const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8fdsdhasdajdksbfma@#*(&@*!^#&jhj5431bhjdsfg839ujkdhfjk';

// Verify the user name, first decode the given token and then compare the name that was send with the username
// that inside the token.
// if the name and the user name is matching then continue the proccess else message error will display.
module.exports = function (request, response, next){
    const usertoken = request.headers['auth-token'];
    const token = usertoken.split(' ');
    const decoded = jwt.verify(usertoken, JWT_SECRET);
    var name = request.params.name;
    if(name != decoded['username']){
      return response.json({ status: 'error', error: 'token does not match to the name you have entered.'})
    }
    try{
        next();
    }catch(err){
        response.status(400).send('Invalid Token');
    }
}