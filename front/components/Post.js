import React, {useState, useCallback, useEffect} from 'react';
import Link from 'next/link'
import {Card, Icon, Avatar, Button, Form, Input, List, Comment, Col} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

function Post({post}){
    const dispatch = useDispatch();
    const {me} = useSelector(state => state.user);
    const {isAddingComment, commentAdded} = useSelector(state => state.post);

    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const onToggleComment = useCallback((e)=> setOpen(pre => !pre),[]);
    const onChangeComment = useCallback((e)=> setComment(e.target.value),[]);
    const onSubmitComment = useCallback((e)=>{
        e.preventDefault();
        if(!me) return alert('로그인이 필요합니다.')
        if(!comment.trim()) return alert('댓글을 입력해 주세요.');
        dispatch({
            type:ADD_COMMENT_REQUEST,
            data:{
                postId:post.id,
                comment,
            }
        })

    },[comment, me && me.id])


    useEffect(()=>{
        setComment('');
    },[commentAdded === true])

    return(
        <div>
        <Card
            style={{marginTop:'1rem'}}
            key={post.createdAt}
            cover={post.img && <img alt={post.title} src={post.img}/>}
            actions={[
                <Icon type="retweet" key="retweet"/>,
                <Icon type="heart" key="heart"/>,
                <Icon type="message" key="message" onClick={onToggleComment}/>,
                <Icon type="ellipsis" key="ellipsis"/>,
            ]}
            extra={<Button>팔로우</Button>}
        >
            <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={<div>{post.content.split(/(#[^\s]+)/g).map( (v,i)=>{
                  if(v.match(/#[^\s]+/g)) return <Link key={v+i} href={`/hashtag/${v.slice(1)}`}><a>{v}</a></Link>
                  return v
                })}</div>}
            />
        </Card>
        {open && (
            <>
                {me && me.id !== undefined && (
                    <Form onSubmit={onSubmitComment}>
                        <Input.TextArea style={{marginBottom:0}} rows={4} value={comment} onChange={onChangeComment} />
                        <Button htmlType="submit" type="primary" style={{width:'100%'}} loading={isAddingComment}>댓글 등록</Button>
                    </Form>
                )}
                <List
                    header={`${post.Comments ? post.Comments.length : 0 } 댓글`}
                    itemLayout="horizontal"
                    dataSource={post && post.Comments || []}
                    renderItem={item => (
                        <li style={{listStyle:'none'}}>
                            <Comment
                                author={item.User.nickname}
                                avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                content={item.content}
                                datetime={item.createdAt}
                            />
                        </li>
                    )}
                />
            </>
        )}
        </div>
    )
}

export default Post;
