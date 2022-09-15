const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
// const pool = require('./modules/pool');

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
const threadsRouter = require('./routes/threads.router');
const messagesRouter = require('./routes/messages.router.js');

// var AWS = require("aws-sdk");

// AWS.config.getCredentials(function (err) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log("Access key:", AWS.config.credentials.accessKeyId);
//   }
// });

// var AWS = require("aws-sdk");

// console.log("Region: ", AWS.config.region);

// socket.io
// const express = require('express');
// const app = express();
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors")
// app.use(cors());

// const server = http.createServer(app)

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });


// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`)




//   socket.on("join_room", (data) => {
//     //data is the room id
//     console.log("room", data)
//     socket.join(data);
//   })

//   socket.on("send_message", (data) => {
//     console.log('this is the data', data);
//     console.log(data.room, data.details.user_id, data.details.id, data.message)


//     query = `INSERT INTO "thread" (code, recipient_user_id, album_id, message)
//     VALUES ('$1', '$2', '$3', '$4');`;
//     pool.query(query, [data.room, data.details.user_id, data.details.id, data.message])
//       .then(response => {
//         console.log(response);
//       })
//     // should be able to send this data to db


//     socket.to(data.room).emit("receive_message", data)
//   })
// })

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
app.use('/threads', threadsRouter);
app.use('/messages', messagesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

// ** Listen * * /
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// server.listen(3001, () => {
//   console.log("SERVER IS RUNNING")
// })
