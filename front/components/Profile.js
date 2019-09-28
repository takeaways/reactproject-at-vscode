import React, {useCallback} from 'react';
import {Card, Avatar, Button, Icon} from 'antd';
import {useDispatch, useSelector} from 'react-redux';




function Profile(){

    const dispatch = useDispatch();
    const {me} = useSelector(state => state.user);


    const onLogout = () => {
        dispatch({
            type:'LOG_OUT_REQUEST'
        })
    }


    return(
        <Card
          actions={[
                <div key="post">개시물<br/>{me.Posts.length || 0 }</div>,
                <div key="following">팔로잉<br/>{me.Followings.length || 0 }</div>,
                <div key="follower">팔로워<br/>{me.Followers.length || 0 }</div>,
                <div key="logout" onClick={onLogout}>로그아웃<br/><Icon type="poweroff"/></div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
        </Card>
    )
}

export default Profile;
