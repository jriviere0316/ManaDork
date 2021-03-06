
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const deckRouter = require('./routes/deck.router');
const cardRouter = require('./routes/card.router');
// const queryRouter = require('./routes/card.router');
const listRouter = require('./routes/list.router');
const friendsRouter = require('./routes/friends.router');
const postRouter = require('./routes/post.router');
const selectedRouter = require('./routes/selecteddeck.router');

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
app.use('/api/deck', deckRouter);
app.use('/api/card', cardRouter);
// app.use('./api/query', queryRouter);
app.use('/api/list', listRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/post', postRouter);
app.use('/api/selected', selectedRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


module.exports = app;