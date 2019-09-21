import React from 'react';
import {Form, Input, Button } from 'antd';
import PreShowImage from './PreShowImage';

const dummy = {
    imagePaths:[
        'http://appdata.hungryapp.co.kr/data_file/data_img/201702/08/W148651553677629241.jpg/hungryapp/resize/500/',
        'http://appdata.hungryapp.co.kr/data_file/data_img/201702/08/W148651553677629241.jpg/hungryapp/resize/500/',
        'http://appdata.hungryapp.co.kr/data_file/data_img/201702/08/W148651553677629241.jpg/hungryapp/resize/500/',
        'http://appdata.hungryapp.co.kr/data_file/data_img/201702/08/W148651553677629241.jpg/hungryapp/resize/500/',
        'http://appdata.hungryapp.co.kr/data_file/data_img/201702/08/W148651553677629241.jpg/hungryapp/resize/500/',
        'http://appdata.hungryapp.co.kr/data_file/data_img/201702/08/W148651553677629241.jpg/hungryapp/resize/500/'
    ]
}

function PostForm(){

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <Form onSubmit={onSubmit} encType="multipart/form-data">
            <Input.TextArea maxLength={140} placeholder={"글을 작성해 주세요...."} />
            <div>
                <input type="file" multiple hidden/>
                {dummy.imagePaths && <PreShowImage imagePaths={dummy.imagePaths} />}
                <Button>사진 업로드</Button>
                <Button style={{float:'right'}} type="primary">등록</Button>
            </div>
        </Form>
    )
}

export default PostForm