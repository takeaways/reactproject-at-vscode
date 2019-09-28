import React, {useEffect, useCallback} from 'react';
import { Card, Button, Icon, List } from 'antd';
import NicknameForm from '../components/NicknameForm';
import {LOAD_USER_POSTS_REQUEST} from '../reducers/post';
import {LOAD_FOLLOWERS_REQUEST, UNFOLLOW_USER_REQUEST,LOAD_FOLLOWINGS_REQUEST, REMOVE_FOLLOWER_REQUEST} from '../reducers/user';
import {useDispatch, useSelector} from 'react-redux';
import Post from '../components/Post';
function Profile(){
    const dispatch = useDispatch();
    const {me, followingList, followerList} = useSelector(state=> state.user);
    const {mainPosts} = useSelector(state=> state.post);
    useEffect(()=>{
      if(me){
        dispatch({
          type:LOAD_FOLLOWERS_REQUEST,
          data:me.id,
        });
        dispatch({
          type:LOAD_FOLLOWINGS_REQUEST,
          data:me.id,
        });
        dispatch({
          type:LOAD_USER_POSTS_REQUEST,
          data:me.id,
        });
      }else{

      }
    },[me && me.id]);


    const onUnfollow = useCallback((userId) => () => {
      dispatch({
        type:UNFOLLOW_USER_REQUEST,
        data:userId
      });
    } ,[]);
    const onRemoveFollower = useCallback((userId) => () => {
      dispatch({
        type:REMOVE_FOLLOWER_REQUEST,
        data:userId
      });
    } ,[]);

    return(
        <div>
            <NicknameForm/>
            <List
                style={{marginTop:'50px',marginBottom : '20px'}}
                grid={{gutter:4, xs:2, md:3}}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={<Button style={{width:'100%'}}>더보기</Button>}
                bordered
                dataSource={followingList}
                renderItem={item => (
                    <List.Item style={{marginTop:'20px'}}>
                        <Card
                            actions={[
                                <Icon key="stop" type="stop" onClick={onUnfollow(item.id)}/>
                            ]}
                        >
                            <Card.Meta description={item.nickname}/>
                        </Card>
                    </List.Item>
                )}
            />
            <List
                style={{marginTop:'50px',marginBottom : '20px'}}
                grid={{gutter:4, xs:2, md:3}}
                size="small"
                header={<div>팔로워 목록</div>}
                loadMore={<Button style={{width:'100%'}}>더보기</Button>}
                bordered
                dataSource={followerList}
                renderItem={item => (
                    <List.Item style={{marginTop:'20px'}}>
                        <Card
                            actions={[
                                <Icon type="stop" onClick={onRemoveFollower(item.id)}/>
                            ]}
                        >
                            <Card.Meta description={item.nickname}/>
                        </Card>
                    </List.Item>
                )}
            />
            <div>
              {mainPosts.map(c=><Post key={c.id} post={c}/>)}
            </div>
        </div>
    )
}

export default Profile;
