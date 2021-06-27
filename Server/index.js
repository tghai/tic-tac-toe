const WebSocketsServerPort = 8000;
const webSocketServer = require("websocket").server;
const http = require("http");

// Spinning the http server and websocket server
const server = http.createServer();
server.listen(WebSocketsServerPort);
console.log("listening to port 8000");

const wsServer = new webSocketServer({
    httpServer : server
});


const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
  };

wsServer.on("request" , (request)=>{
    var userID = getUniqueID();
    console.log((new Date()) + " Recieved a new connection from origin " + request.origin +".");
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log("connected : "+ userID +"in "+ Object.getOwnPropertyNames(clients));

    connection.on("message", (message)=>{
        if(message.type === "utf8") {
            console.log("Reeived message "+ message.utf8Data);

            for(var key in clients) {
                clients[key].sendUTF(message.utf8Data);
                console.log("Send message to : "+ clients[key]);
            }
        }
    });
});