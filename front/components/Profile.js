import React from 'react';
import {Card, Avatar} from 'antd'; 

const dummy = {
    nickname:'홍길동',
    Post:[],
    Followings:[],
    Followers:[]
}


function Profile(){
    return(
        <Card
            actions={[
                <div key="post">개시물<br/>{dummy.Post.length}</div>,
                <div key="following">팔로잉<br/>{dummy.Followings.length}</div>,
                <div key="follower">팔로워<br/>{dummy.Followers.length}</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                title={dummy.nickname}
            />
        </Card>
    )
}

export default Profile;