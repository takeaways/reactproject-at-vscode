import React,{useRef, useCallback, useState, useEffect} from 'react';
import {Form, Input, Button } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import PreShowImage from './PreShowImage';
import { ADD_DUMMY, ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../reducers/post';


function PostForm(){

    const dispatch = useDispatch();
    const {imagePaths, isAddingPost, postAdded} = useSelector( state => state.post);

    const imageInput = useRef('');
    const onChangeImages =  useCallback(e=>{
      const files = e.target.files;
      const imageFormData = new FormData();
      // files.forEach((f)=> imageFormData.append(f))
      [].forEach.call(files, f => {
        imageFormData.append('image',f);
      });
      dispatch({
        type:UPLOAD_IMAGES_REQUEST,
        data:imageFormData,
      })
    },[]);
    const onClickImageUpload = useCallback(e => {
      imageInput.current.click();
    },[imageInput.current]);

    const [text, setText] = useState('');
    const onChangeText = (e) => setText(e.target.value);

    const onSubmit = useCallback( (e) => {
        e.preventDefault();
        if(!text.trim()) return alert('게시글을 입력해 주세요.');
        const formData = new FormData();
        imagePaths.forEach((i) => {
          formData.append('image',i);
        });
        formData.append('content', text);
        dispatch({
            type:ADD_POST_REQUEST,
            data:formData,
        });
    },[text, imagePaths]);

    useEffect(()=>{
        if(postAdded) setText('');
    },[postAdded === true]);

    return(
        <Form onSubmit={onSubmit} encType="multipart/form-data">
            <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder={"글을 작성해 주세요...."} />
            <div>
                <input type="file" ref={imageInput} onChange={onChangeImages} multiple hidden/>
                {imagePaths && imagePaths.length !== 0 &&<PreShowImage imagePaths={imagePaths} />}
                <Button onClick={onClickImageUpload}>사진 업로드</Button>
                <Button style={{float:'right'}} htmlType="submit" type="primary" loading={isAddingPost}>등록</Button>
            </div>
        </Form>
    )
}

export default PostForm
