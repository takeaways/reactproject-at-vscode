import React, {useState, useCallback, useEffect} from 'react';
import Link from 'next/link'
import {Card, Icon, Avatar, Button, Form, Input, List, Comment, Col, Popover} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import { REMOVE_POST_REQUEST,ADD_COMMENT_REQUEST,LOAD_COMMENTS_REQUEST,UNLIKE_POST_REQUEST,LIKE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';
import { UNFOLLOW_USER_REQUEST, FOLLOW_USER_REQUEST} from '../reducers/user';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import moment from 'moment';
moment.locale('ko');

const Post = ({post}) => {
    const dispatch = useDispatch();
    const {me} = useSelector(state => state.user);
    const {isAddingComment, commentAdded} = useSelector(state => state.post);

    const liked = me && post.Likers && post.Likers.find(v => v.id === me.id);

    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const onToggleComment = useCallback((e)=>{
       setOpen(pre => !pre);
       if(!open){
         dispatch({
           type:LOAD_COMMENTS_REQUEST,
           data:post.id
         })
       }
     },[open, post && post.id]);
    const onChangeComment = useCallback((e)=> setComment(e.target.value),[]);
    const onSubmitComment = useCallback((e)=>{
        e.preventDefault();
        if(!me) return alert('로그인이 필요합니다.')
        if(!comment.trim()) return alert('댓글을 입력해 주세요.');
        dispatch({
            type:ADD_COMMENT_REQUEST,
            data:{
                postId:post.id,
                content:comment,
            }
        })

    },[comment, me && me.id]);

    const onToggleLike = useCallback(()=> {
      if(!me) return alert('로그인이 필요합니다.');
      if(liked){
        return dispatch({
          type:UNLIKE_POST_REQUEST,
          data:post.id
        })
      }else{ // 좋아요 안누른 상태
        return dispatch({
          type:LIKE_POST_REQUEST,
          data:post.id
        })
      }
    } ,[me && me.id, post && post.id, liked]);

    const onRetweet = useCallback(e=>{
      if(!me)return alert('로그인이 필요합니다.');
      return dispatch({
        type:RETWEET_REQUEST,
        data:post.id
      })
    },[me && me.id, post && post.id ]);

    const onUnfollow = useCallback( userId => () => {
      dispatch({
        type:UNFOLLOW_USER_REQUEST,
        data:userId,
      })
    }, [])
    const onFollow = useCallback( userId => () => {
      dispatch({
        type:FOLLOW_USER_REQUEST,
        data:userId,
      })
    }, [])

    const onRemovePost = useCallback( (postId) => () => {
      dispatch({
        type:REMOVE_POST_REQUEST,
        data:postId
      })
    })


    useEffect(()=>{
        setComment('');
    },[commentAdded === true])

    return(
        <div>
        <Card
            style={{marginTop:'1rem'}}
            key={post.createdAt}
            cover={post.Images && post.Images.length !== 0 && <PostImages images={post.Images}/>}
            actions={[
                <Icon type="retweet" key="retweet" onClick={onRetweet} />,
                <Icon type="heart" key="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" onClick={onToggleLike} />,
                <Icon type="message" key="message" onClick={onToggleComment}/>,
                <Popover
                  key="ellipsis"
                  content={(
                    <Button.Group>
                      {me && post.UserId === me.id
                        ? (<>
                            <Button>수정</Button>
                            <Button type="danger" onClick={onRemovePost(post.id)} >삭제</Button>
                          </>)
                        : (<Button>신고</Button>)
                      }
                    </Button.Group>
                  )}>
                <Icon type="ellipsis"/>
                </Popover>
            ]}
            title={post.RetweetId ? `${post.User.nickname}님이 리트윗 하셨습니다.` : null}
            extra={ !me || post.User.id === me.id
              ? null
              : me.Followings && me.Followings.find(v => v.id === post.User.id)
                ? <Button onClick={onUnfollow(post.User.id)} >팔로우 취소</Button>
                : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
            }
        >
            { post.RetweetId && post.Retweet
              ?(
                <Card
                  cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images}/>}
                  >
                  <Card.Meta
                  avatar={<Avatar><Link href={{pathname:`/user`, query:{id: post.Retweet.User.id} }} as={`/user/${post.User.id}`}><a>{post.Retweet.User.nickname[0]}</a></Link></Avatar>}
                  title={post.Retweet.User.nickname}
                  description={<PostCardContent postData={post.Retweet.content} />}

                  />
                </Card>
              )
              :(
                  <Card.Meta
                  avatar={<Avatar><Link href={{pathname:`/user`, query:{id: post.User.id} }} as={`/user/${post.User.id}`}><a>{post.User.nickname[0]}</a></Link></Avatar>}
                  title={<div><div style={{width:'40%',margin:0}}>{post.User.nickname}</div><div style={{float:'right',width:'50%',margin:0,top:0}}>{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div></div>}
                  description={<PostCardContent postData={post.content} />}
                  />
                )
            }
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
                                avatar={<Avatar><Link href={{pathname:`/user`, query:{id: item.User.id}}} as={`/user/${item.User.id}`}><a>{item.User.nickname[0]}</a></Link></Avatar>}
                                content={item.content}
                                datetime={moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
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
