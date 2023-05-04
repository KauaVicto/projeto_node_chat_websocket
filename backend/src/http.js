import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

var corsOptions = {
    origin: 'http://192.168.0.108:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send({ nome: 'Kauã' })
})

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        "origin": "http://192.168.0.108:8080",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }
});

export { serverHttp, io };