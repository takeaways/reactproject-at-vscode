const express = require('express');
const db= require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const post = req.body.content
    const hashtags = post.match(/#[^\s]+/gi);
    const newPost = await db.Post.create({
      content:post,
      UserId:req.user.id
    });
    if(hashtags){
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
        where:{name:tag.slice(1).toLowerCase()}
      })));
      await newPost.addHashtags(result.map(r => r[0]));
    }
    /*
      const User = await newPost.getUser();
      newPost.User = User;
      res.json(newPost);
    */
    const fullPost = await db.Post.findOne({
      where:{id:newPost.id},
      include:[{
        model:db.User,
        attributes:['id','nickname']
      }]
    });
    res.json(fullPost.toJSON())
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
