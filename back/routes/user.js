const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const db = require('../models');


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

router.get(`/:id`, (req, res) => {

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

router.get('/:id/follow', (req, res) => {

});

router.post('/:id/follw', (req, res) => {

});

router.delete('/:id/follow', (req, res) => {

});

router.delete('/:id/follower', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});






module.exports = router;
