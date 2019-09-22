import React, {useState, useCallback} from 'react';
import {Form, Input, Button} from 'antd';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';

import {
    LOG_IN_REQUEST,
} from '../reducers/user';


function LoginForm(){
    
    const dispatch = useDispatch();
    const {isLoggingIn} = useSelector(state => state.user);

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const onChangeId = useCallback( (e) => setId(e.target.value), []);
    const onChangePassword = useCallback( (e) => setPassword(e.target.value), []);

    const onSubmit = useCallback( (e) => {
        e.preventDefault();
        if(!id || !password) return alert('아이디와 비밀번호를 확인해주세요.');
        dispatch({
            type:LOG_IN_REQUEST,
            data:{userId:id,password}
        })
    },[id, password]);

    return(
        <Form onSubmit={onSubmit}>
            <Input placeholder="아이디" value={id} onChange={onChangeId}/>
            <Input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword}/>
            <div style={{display:'flex',justifyContent:'flex-end'}}>
                <Button style={{width:'50%'}} name="login" type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
                <Button style={{width:'50%'}} name="login"><Link href="/signup"><a>회원가입</a></Link></Button>
            </div>
        </Form>
    )
}

export default LoginForm;