const io = require('socket.io')(8900 , {
    cors: {
        origin: "http://localhost:4200"
    }
})

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({userId, socketId});
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
}

const removeUser = (socketId) => {
    users.filter((user) => user.socketId !== socketId);
}
io.on("connection", (socket) => {
    console.log('User is connected'),

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    })

    socket.on("disconnect" , () =>{
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
})