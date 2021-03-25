const http = require('http');
const app = require('./app');

//dire à l'application sur quel port elle va tourner
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);