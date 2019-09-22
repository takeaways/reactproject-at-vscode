import React,{useCallback, useState, useEffect} from 'react';
import {Form, Input, Button } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import PreShowImage from './PreShowImage';
import { ADD_DUMMY, ADD_POST_REQUEST } from '../reducers/post';


function PostForm(){

    const dispatch = useDispatch();
    const {imagePaths, isAddingPost, postAdded} = useSelector( state => state.post);

    const [text, setText] = useState('');
    const onChangeText = (e) => setText(e.target.value);

    const onSubmit = useCallback( (e) => {
        e.preventDefault();
        if(!text.trim()) return alert('게시글을 입력해 주세요.')
        dispatch({
            type:ADD_POST_REQUEST,
            data:{content:text}
        });
    },[text]);

    useEffect(()=>{

        if(postAdded) setText('');
    },[postAdded === true]);

    return(
        <Form onSubmit={onSubmit} encType="multipart/form-data">
            <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder={"글을 작성해 주세요...."} />
            <div>
                <input type="file" multiple hidden/>
                {imagePaths && imagePaths.length !== 0 &&<PreShowImage imagePaths={imagePaths} />}
                <Button>사진 업로드</Button>
                <Button style={{float:'right'}} htmlType="submit" type="primary" loading={isAddingPost}>등록</Button>
            </div>
        </Form>
    )
}

export default PostForm
