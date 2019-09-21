import React from 'react';
import {Card, Icon, Avatar, Button} from 'antd';

function Post({post}){
    return(
        <Card
            style={{marginTop:'1rem'}}
            key={post.createdAt}
            cover={post.img && <img alt={post.title} src={post.img}/>}
            actions={[
                <Icon type="retweet" key="retweet"/>,
                <Icon type="heart" key="heart"/>,
                <Icon type="message" key="message"/>,
                <Icon type="ellipsis" key="ellipsis"/>,
            ]}
            extra={<Button>팔로우</Button>}
        >
            <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={post.content}
            />
        </Card>
    )
}

export default Post;