import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LOAD_HASHTAG_POSTS_REQUEST} from '../reducers/post';
import Post from '../components/Post';

function Hashtag({tag}){
  const {mainPosts} = useSelector(state => state.post);
  return(
    <div>
      {mainPosts.map(c=><Post key={c.id} post={c}/>)}
    </div>
  )
}

Hashtag.getInitialProps = async (context) => {
  const tag = context.query.tag;
  context.store.dispatch({
    type:LOAD_HASHTAG_POSTS_REQUEST,
    data:tag
  })
  return {tag}
}

export default Hashtag
