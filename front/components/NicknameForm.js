import React, {useState,useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Input, Button} from 'antd';
import {EDIT_NICKNAME_REQUEST} from '../reducers/user';

function NicknameForm(){

    const dispatch = useDispatch();
    const {isEditingNickname, me} = useSelector(state=>state.user);
    const [editedName, setEditName] = useState('');
    const onChangeNickname = useCallback((e)=>setEditName(e.target.value));


    const onSubmit = useCallback((e)=>{
      e.preventDefault();
      dispatch({
        type:EDIT_NICKNAME_REQUEST,
        data:editedName,
      });
    },[editedName])

    return(
        <Form onSubmit={onSubmit}>
            <Input addonBefore="닉네임" name="nickname" value={editedName || me && me.nickname} onChange={onChangeNickname} placeholder="닉네임 변경하기.."/>
            <Button htmlType="submit" loading={isEditingNickname} type="primary" style={{float:'right',marginTop:'4px'}}>변경</Button>
        </Form>
    )
}

export default NicknameForm;
