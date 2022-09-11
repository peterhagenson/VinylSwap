const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const apiRouter = require('./routes/api.router');
const searchRouter = require('./routes/search.router');
const profileRouter = require('./routes/profile.router');
// const userInventoryRouter = require('./routes/userInventory.router')
const albumDetailsRouter = require('./routes/details.router');
const traderRouter = require('./routes/trader.router');
const albumToAddRouter = require('./routes/albumToAdd.router');

// socket.io
// const express = require('express');
// const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors")
app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)
  socket.broadcast.emit("hello world")


  socket.on("join_room", (data) => {
    //data is the room id
    console.log("room", data)
    socket.join(data);
  })

  socket.on("send_message", (data) => {
    console.log('this is the data', data);
    // should be able to send this data to db

    socket.to(data.room).emit("receive_message", data)
  })
})

//----------------------------------------



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/inventoryAPI', apiRouter);
app.use('/searchDB', searchRouter);
app.use('/profile', profileRouter);
// app.use('/userInventory', userInventoryRouter);
app.use('/details', albumDetailsRouter);
app.use('/trader', traderRouter);
app.use('/albumToAdd', albumToAddRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

// ** Listen * * /
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING")
})
