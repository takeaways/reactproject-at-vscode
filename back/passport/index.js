const passport = require('passport');
const db = require('../models');
const local = require('./local');
module.exports = () =>{
  passport.serializeUser((user, done)=>{
    //서버쪽에 [{id:3, cookie:'asdad'}]; 로 저장하는 역할
    //cookie는 프론트로 -> 여기서 user.id링  - 쿠키랑 연결
    return done(null, user.id)
  });

  //프론트에서 쿠키를 넘기면  id 를 받는다! 시리얼라이즈가 아이디를 알고 있기 때문에 사용가능
  //시리얼 라이즈로 만들어진 쿠키를 매번 확인하면서 있으면 실행
  passport.deserializeUser( async (id, done)=>{
    try {
      const user = await db.User.findOne({
        where:{id},
        include:[{
          model:db.Post,
          as:'Posts',
        },{
          model:db.User,
          as:'Followings',
          attributes:['id']
        },{
          model:db.User,
          as:'Followers',
          attributes:['id']
        }],
        attributes:['id','nickname','userId']
      });
      return done(null, user); //req.user에 저장됩니다.
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

//전략 연결
  local();


};//module

//프론트에서 서버로는 쿠키만 보낸다
//서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사 후 id:3 발견
//req.user 로 사용자 정보가 들어감
