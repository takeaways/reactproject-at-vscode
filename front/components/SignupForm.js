import React, {useState, useCallback, useEffect} from 'react';
import {Form, Input, Modal, Button, Checkbox} from 'antd';
import Router from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';


function SignupForm(){

    const dispatch = useDispatch();
    const {isSigningUp, me} = useSelector(state => state.user);
     
    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);

    const onChangeId = useCallback( (e) => setId(e.target.value) , [] );
    const onChangeNickname = useCallback( (e) => setNickname(e.target.value) , [] );
    const onChangePassword = useCallback( (e) => setPassword(e.target.value) , [] );
    const onChangeTerm = useCallback( (e) => setTerm(e.target.checked) , [] );
    const onChangePasswordCheck = useCallback( (e) => setPasswordCheck(e.target.value) , [] );


    const onSubmit = useCallback( (e) => {
        e.preventDefault();
        if(!id || !nickname || !password || !passwordCheck) return alert('회원폼을 확인해 주세요.');
        if(password !== passwordCheck) return alert("비밀번호가 일치 하지 않습니다.");
        if(!term) return alert('약관에 동의 하셔야 합니다.');
        dispatch({
            type:SIGN_UP_REQUEST,
            data:{
                userId:id, nickname, password
            }
        });
    },[password, passwordCheck, id, nickname, term]);

    useEffect(() => {
        if(me && me.id !== undefined){
            alert('로그인 되어 있습니다.')
            Router.push('/')
        }
    },[me && me.id])


    return(
        <Form onSubmit={onSubmit} style={{padding:40}}>
            <div>
                <span>아이디</span>
                <Input style={{marginBottom:'30px'}} name="user-id" value={id} onChange={onChangeId} required autoComplete="true"/>
            </div>
            <div>
                <span>닉네임</span>
                <Input style={{marginBottom:'30px'}} name="user-nickname" value={nickname} onChange={onChangeNickname} required autoComplete="true"/>
            </div>
            <div>
                <span>비밀번호</span>
                <Input style={{marginBottom:'30px'}} name="user-password" type="password" value={password} onChange={onChangePassword} required autoComplete="true"/>
            </div>
            <div>
                <span>비밀번호 확인</span>
                <Input style={{marginBottom:'30px'}} name="user-password-check" type="password" value={passwordCheck} onChange={onChangePasswordCheck} required autoComplete="true"/>
            </div>
            <div style={{float:'right'}}>
                <Checkbox  style={{marginBottom:'30px'}} name="user-term" value={term} checked={term} onChange={onChangeTerm}/>동의하기
            </div>
            <Button style={{width:'100%'}} type="primary" htmlType="submit" loading={isSigningUp}>회원가입</Button>
      </Form>
    )
}

export default SignupForm