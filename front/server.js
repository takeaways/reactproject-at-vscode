const express = require('express');
const next = require('next');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';

dotenv.config();
const app = next({dev});
const handle = app.getRequestHandler();


const serverHandler = ()=>{
  const server = express();
  server.use(morgan('dev'));
  server.use(express.json());
  server.use('/',express.static(path.join(__dirname,'public')))
  server.use(express.urlencoded({extended:true}));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
      httpOnly:true,
      secure:false
    }
  }));

  server.get(`/hashtag/:tag`,(req, res, next) => {
    const tag = req.params.tag;
    app.render(req, res, '/hashtag', {tag})
  });

  server.get(`/user/:id`,(req, res, next) => {
    const id = req.params.id;
    app.render(req, res, '/user',{id})
  });

  server.get(`/post/:id`,(req, res, next) => {
    const id = req.params.id;
    app.render(req, res, '/post', {id})
  });

  server.get('*', (req,res) => {
    return handle(req, res);
  });


  server.listen(process.env.PORT, ()=>console.log(`FRONT start : ${process.env.PORT}`))
}




app.prepare().then(serverHandler);
