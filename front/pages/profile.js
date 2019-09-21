import React from 'react';
import { Card, Button, Icon, List } from 'antd';
import NicknameForm from '../components/NicknameForm';


function Profile(){
    return(
        <div>
            <NicknameForm/>
            <List
                style={{marginTop:'50px',marginBottom : '20px'}}
                grid={{gutter:4, xs:2, md:3}}
                size="small"
                header={<div>팔로워 목록</div>}
                loadMore={<Button style={{width:'100%'}}>더보기</Button>}
                bordered
                dataSource={['장건일','신류진','배수지']}
                renderItem={item => (
                    <List.Item style={{marginTop:'20px'}}>
                        <Card
                            actions={[
                                <Icon type="stop"/>
                            ]}
                        >
                            <Card.Meta description={item}/>
                        </Card>
                    </List.Item>
                )}
            />
            <List
                style={{marginTop:'50px',marginBottom : '20px'}}
                grid={{gutter:4, xs:2, md:3}}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={<Button style={{width:'100%'}}>더보기</Button>}
                bordered
                dataSource={['홍진영','신류진','배수지']}
                renderItem={item => (
                    <List.Item style={{marginTop:'20px'}}>
                        <Card
                            actions={[
                                <Icon key="stop" type="stop"/>
                            ]}
                        >
                            <Card.Meta description={item}/>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Profile;