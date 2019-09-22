const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');

const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const passportConfig = require('./passport');
const db = require('./models');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080
passportConfig();
db.sequelize.sync();

app.use(cors({
    origin:true,
    credentials:true,
}));
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
    name:'jmt'
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user/', userAPIRouter);
app.use('/api/post/', postAPIRouter);
app.use('/api/posts/', postsAPIRouter);


app.listen(PORT, () => {
    console.log(`server is running on localhost:${PORT}`);

})
