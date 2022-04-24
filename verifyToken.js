const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8fdsdhasdajdksbfma@#*(&@*!^#&jhj5431bhjdsfg839ujkdhfjk';

// Verify the token that was entered with my JWT_SECRET key, if there is a match then the proccess will continue
// else, error message will display.
module.exports = function (request, response, next){
    const token = request.header('auth-token');
    if(!token) return response.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, JWT_SECRET);
        request.user = verified;
        next();
    }catch(err){
        response.status(400).send('Invalid Token');
    }
}