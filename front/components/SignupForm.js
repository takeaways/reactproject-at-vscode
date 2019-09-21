import React, {useState, useCallback} from 'react';
import {Form, Input, Modal, Button, Checkbox} from 'antd';


function SignupForm(){
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
        if(password !== passwordCheck) return alert("비밀번호가 일치 하지 않습니다.")
    },[]);


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
            <Button style={{width:'100%'}} type="primary" htmlType="submit">회원가입</Button>
      </Form>
    )
}

export default SignupForm