// sample code on node.js server creation
const http = require("http");

//importing routes file with below line
const routes = require("./routes");

const server = http.createServer(routes);
server.listen(3000);
