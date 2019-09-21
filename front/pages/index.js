import React from 'react';
import PostForm from '../components/PostForm';
import Post from '../components/Post';


const dummy ={
    mainPosts:[
        {   
            id:1,
            createdAt:'2019-09-21',
            img:'http://appdata.hungryapp.co.kr/data_file/data_img/201702/08/W148651553677629241.jpg/hungryapp/resize/500/',
            title:'반갑다 제목',
            content:'안녕하세ㅔ에에ㅔ에에에',
            User:{
                nickname:'장건일'
            }
        },
        {   
            id:4,
            createdAt:'2019-09-21',
            img:'http://appdata.hungryapp.co.kr/data_file/data_img/201702/08/W148651553677629241.jpg/hungryapp/resize/500/',
            title:'반갑다 제목',
            content:'안녕하세ㅔ에에ㅔ에에에',
            User:{
                nickname:'장건일'
            }
        },
        {   
            id:2,
            createdAt:'2019-09-21',
            img:'http://appdata.hungryapp.co.kr/data_file/data_img/201702/08/W148651553677629241.jpg/hungryapp/resize/500/',
            title:'반갑다 제목',
            content:'안녕하세ㅔ에에ㅔ에에에',
            User:{
                nickname:'장건일'
            }
        }
    ]
}
const Home = () => {
    return (
        <>
            <PostForm/>
            {dummy.mainPosts &&  dummy.mainPosts.map(post => <Post key={post.id} post={post}/>) } 
        </>
    )
}

export default Home