import React, {useCallback} from 'react';
import {Card, Avatar, Button, Icon} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import Link from 'next/link';




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
                <Link href="/profile" key="post">
                  <a>
                    <div>개시물<br/>{me.Posts.length || 0 }</div>
                  </a>
                </Link>,
                <Link href="/profile" key="following">
                  <a>
                    <div>팔로잉<br/>{me.Followings.length || 0 }</div>
                  </a>
                </Link>,
                <Link href="/profile" key="follower">
                  <a>
                    <div>팔로워<br/>{me.Followers.length || 0 }</div>
                  </a>
                </Link>,
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
