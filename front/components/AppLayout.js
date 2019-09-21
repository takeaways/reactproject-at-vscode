import React from 'react';
import {Menu, Input, Row, Col, Icon} from 'antd';
import Link from 'next/link';
import Profile from '../components/profile';
import LoginForm from './LoginForm'




function AppLayout({children}){
    return(
        <>
            <Menu mode="horizontal">
                <Menu.Item key="home" ><Link href="/"><a><Icon style={{margin:0}} type="home" /></a></Link></Menu.Item>
                <Menu.Item key="profile" ><Link href="profile"><a><Icon style={{margin:0}} type="user" /></a></Link></Menu.Item>
                <Menu.Item>
                    <Input.Search enterButton style={{verticalAlign:"middle"}}/>    
                </Menu.Item>
            </Menu>
            <Row>
                <Col style={{padding:'12px 30px'}} xs={24} md={6}>{ false ? <Profile/> : <LoginForm/> }</Col>
                <Col style={{padding:'12px 30px'}} xs={24} md={13}>{children}</Col>
                <Col style={{padding:'12px 30px'}} xs={24} md={5} >
                    <div style={{bottom:0}}>Made By Geonil Jang</div>
                </Col>
            </Row>
            
        </>
    )
}



export default AppLayout;