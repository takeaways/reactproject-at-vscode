import React, {useEffect} from 'react';
import PostForm from '../components/PostForm';
import Post from '../components/Post';
import {useDispatch, useSelector} from 'react-redux';
import {LOAD_MAIN_POSTS_REQUEST} from '../reducers/post'


const Home = () => {
    const dispatch = useDispatch();
    const { mainPosts } = useSelector(state => state.post);
    const {me} = useSelector(state => state.user);

    useEffect(()=>{
      dispatch({type:LOAD_MAIN_POSTS_REQUEST})
    },[])

    return (
        <>
            { me &&<PostForm/> }
            { mainPosts &&  mainPosts.map(post => <Post key={post.id} post={post}/>) }
        </>
    )
}

export default Home
