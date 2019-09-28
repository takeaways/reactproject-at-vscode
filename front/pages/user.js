import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Post from '../components/Post';
import {LOAD_USER_POSTS_REQUEST} from '../reducers/post';
import {LOAD_USER_REQUEST} from '../reducers/user';
import {Card, Avatar, Icon} from 'antd';

function User({id}){
  const dispatch = useDispatch();
  const {mainPosts} = useSelector(state => state.post);
  const {userInfo} = useSelector(state => state.user);
  useEffect(()=>{
    dispatch({
      type:LOAD_USER_REQUEST,
      data:id,
    })
    dispatch({
      type:LOAD_USER_POSTS_REQUEST,
      data:id,
    })
  },[id])

  return(
    <div>
      {userInfo
        ? <Card
            actions={[
                <div key="post">개시물<br/>{userInfo.Posts || 0 }</div>,
                <div key="following">팔로잉<br/>{userInfo.Followings || 0 }</div>,
                <div key="follower">팔로워<br/>{userInfo.Followers || 0 }</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                title={userInfo.nickname}
            />
        </Card>
        :null
      }
      {mainPosts.map(c => (
        <Post key={c.createdAt} post={c}/>
      ))}
    </div>
  )
}

User.getInitialProps = async (context) => {
  const id = context.query.id;
  return {id}
}

export default User
