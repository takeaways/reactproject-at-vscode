import React from 'react';
import {Form, Input, Button} from 'antd';

function NicknameForm(){
    return(
        <Form>
            <Input addonBefore="닉네임" name="nickname" placeholder="닉네임 변경하기.."/>
            <Button type="primary" style={{float:'right',marginTop:'4px'}}>변경</Button>
        </Form>
    )
}

export default NicknameForm;