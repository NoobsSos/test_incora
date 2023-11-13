// import sequelize from "./db.js";

// import User from "./Models/User.js";

// const transaction = await sequelize.transaction();

import express from "express";
import sequelize from "./db/db.js";
import userRouter from "./router/userRouter.js";
import authRouter from "./router/authRouter.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("io", io);

app.use(express.json());

app.use('/users', userRouter);
app.use('/login', authRouter);

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

const PORT = 5000;

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();

