const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const {isLoggedIn} = require('./middlewares');

router.get('/', (req, res) => {
    const user = req.user && req.user.toJSON();
    if(!user) return res.status(401).send('로그인이 필요합니다.')
    return res.json(user);
});

router.post('/', async (req, res, next) => {
    try{
        const exUser = await db.User.findOne({
            where:{
                userId : req.body.userId
            },
        });
        if(exUser) return res.status(403).send('이미 가입된 사용자 입니다.');
        const hashedPassword = await bcrypt.hash(req.body.password, 11);
        const newUser = await db.User.create({
            nickname:req.body.nickname,
            userId:req.body.userId,
            password:hashedPassword,
        });
        const user = await db.User.findOne({
            where:{
                id:newUser.dataValues.id,
            },
            include:[{
                model: db.Post,
                as: 'Posts'
            },{
                model: db.User,
                as: 'Followings',
                attributes:['id']
            },{
                model: db.User,
                as: 'Followers',
                attributes:['id']
            }],
            attributes:['id','nickname'],
        });
        res.json(user);
    }catch(e){
        console.error(e);
        next(e);
    }
});

router.get(`/:id`, async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await db.User.findOne({
      where:{
        id,
      },
      attributes:['id','nickname'],
      include:[{
          model: db.Post,
          as: 'Posts'
      },{
          model: db.User,
          as: 'Followings',
          attributes:['id']
      },{
          model: db.User,
          as: 'Followers',
          attributes:['id']
      }]
    });
    const jsonUser = user.toJSON();
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    console.log(jsonUser)
    res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('로그아웃 했습니다.');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.error(err);
            return next(err);
        }
        if(info) return res.status(401).send(info.reason);
        return req.login(user, (loginErr) => {//serialize
            if(loginErr) return next(loginErr);
            return res.json(user);
        });
    })(req, res, next);
});



router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({where:{id:req.user.id}});
    await me.addFollowing(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/follow', isLoggedIn, async(req, res) => {
  try {
    const me = await db.User.findOne({where:{id:req.user.id}});
    await me.removeFollowing(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});



router.get('/:id/posts', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      where:{
        UserId:parseInt(req.params.id) || (req.user && req.user.id) || 0,
        RetweetId:null,
      },
      include:[{
        model:db.User,
        attributes:['id','nickname']
      },{
        model:db.Image
      },{
        model:db.User,
        through:'Like',
        as:'Likers',
        attributes:['id']
      }],
      order:[['createdAt','DESC']]
    })
    res.json(posts)
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where:{id:parseInt(req.params.id)  || (req.user && req.user.id) || 0},
    });
    const followers = await user.getFollowers({
      attributes:['id','nickname'],
      limit:parseInt(req.query.limit),
      offset:parseInt(req.query.offset),
    });
    res.json(followers);
  } catch (e) {
      console.error(e);
      next(e);
  }
});

router.get('/:id/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where:{id:parseInt(req.params.id)  || (req.user && req.user.id) || 0 },
    });
    const followings = await user.getFollowings({
      attributes:['id','nickname'],
      limit:parseInt(req.query.limit),
      offset:parseInt(req.query.offset),
    });
    res.json(followings)
  } catch (e) {
      console.error(e);
      next(e);
  }
});

router.delete('/:id/follower', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({where:{id:parseInt(req.user.id)  || (req.user && req.user.id) || 0}});
    await me.removeFollowers(req.params.id);
    res.send(req.params.id);
  } catch (e) {
      console.error(e);
      next(e);
  }
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await db.User.update({
      nickname:req.body.nickname,
    },{
      where:{id:req.user.id}
    });
    res.send(req.body.nickname);
  } catch (e) {
      console.error(e);
      next(e);
  }
});





module.exports = router;
