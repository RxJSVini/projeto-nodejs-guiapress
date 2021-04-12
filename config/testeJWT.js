const configJwt = require('./jwt')
const jwt = require('jsonwebtoken');

console.log(jwt.verify('adasdasdasdasdasdasd', configJwt.secret));