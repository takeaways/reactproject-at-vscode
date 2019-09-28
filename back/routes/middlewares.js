exports.isLoggedIn = (req,res,next)=>{
  if(req.isAuthenticated()) return next();
  res.status(401).send('로그인 하세요');
}

exports.isNotLoggedIn = (req,res,next) => {
  if(!req.isAuthenticated()) return next();
  res.status(401).send('로그인한 사용자는 접근할 수 없습니다.');
}
