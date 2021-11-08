const express = require('express');
const morgan = require('morgan');
const path = require('path');

const session = require('express-session');
const grandMotherRouter = require('./routes/router.grandmother');
const grandSonRouter = require('./routes/router.grandson');
const indexRouter = require('./routes/router.index');
const profileRouter = require('./routes/router.profile');
const userMiddlware = require('./middleWare/user');
const FileStore = require('session-file-store')(session);
const recognizeRouter = require('./routes/router.recognize');
const uploadRouter = require('./routes/router.upload');
const logoutRouter = require('./routes/router.logout');

const sessionConfig = {
  name: 'user_sid',
  secret: 'sectet',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
  store: new FileStore(),
};

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));

app.use(userMiddlware);
app.use('/', indexRouter);
app.use('/grandmother', grandMotherRouter);
app.use('/grandson', grandSonRouter);
app.use('/profile', profileRouter);
app.use('/recognize', recognizeRouter);
app.use('/upload', uploadRouter);
app.use('/logout', logoutRouter);
// Если HTTP-запрос дошёл до этой строчки, значит ни один из ранее встречаемых рутов не ответил на запрос. Это значит, что искомого раздела просто нет на сайте. Для таких ситуаций используется код ошибки 404. Создаём небольшое middleware, которое генерирует соответствующую ошибку.
// app.use((req, res, next) => {
//   const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
//   next(error);
// });

app.listen(port, () => {
  console.log(`server started PORT: ${port}`);
});
