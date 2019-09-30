import React, {useEffect, useCallback, useRef} from 'react';
import PostForm from '../components/PostForm';
import Post from '../components/Post';
import {useDispatch, useSelector} from 'react-redux';
import {LOAD_MAIN_POSTS_REQUEST} from '../reducers/post'


const Home = () => {
    const dispatch = useDispatch();
    const { mainPosts ,hasMorePost} = useSelector(state => state.post);
    const {me} = useSelector(state => state.user);
    const countRef = useRef([]);


    const onScroll = useCallback(() => {
      if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
        if(hasMorePost){
          const lastId = mainPosts[mainPosts.length - 1].id;
          if(!countRef.current.includes(lastId)){
            dispatch({
              type:LOAD_MAIN_POSTS_REQUEST,
              lastId,
            });
            countRef.current.push(lastId)
          }
        }
      }
    },[hasMorePost, mainPosts && mainPosts.length, countRef && countRef.current]);


    useEffect(()=>{
      window.addEventListener('scroll', onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    },[mainPosts && mainPosts.length, hasMorePost]);

    return (
        <>
            { me &&<PostForm/> }
            { mainPosts &&  mainPosts.map(post => <Post key={post.id} post={post}/>) }
        </>
    )
}


Home.getInitialProps = async (context) => {
  context.store.dispatch({
    type:LOAD_MAIN_POSTS_REQUEST
  });
}
export default Home
