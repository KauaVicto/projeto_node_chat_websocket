import { io } from './http.js';

const users = [];
const messages = [];


io.on("connection", socket => {

    socket.on('username', data => {

        socket.join('all');

        const userInRoom = users.find(user => user.username === data.username)

        if (userInRoom) {
            userInRoom.socket_id = socket.id
        } else {

            users.push({
                socket_id: socket.id,
                username: data.username
            });
        }

    });

    socket.on('message', data => {

        const message = {
            username: data.username,
            text: data.message,
            datetime: Date.now()
        }

        messages.push(message);

        io.to('all').emit('message', message)

    })

});