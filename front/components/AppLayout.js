import React, { useEffect } from 'react';
import {Menu, Input, Row, Col, Icon} from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import Profile from '../components/profile';
import LoginForm from './LoginForm'
import {useSelector, useDispatch} from 'react-redux';
import { LOAD_USER_REQUEST } from '../reducers/user';




function AppLayout({children}){
    const {me} = useSelector(state => state.user);
    const onSearch = (value) => {
      Router.push({pathname:'/hashtag',query:{tag:value} }, `/hashtag/${value}`)
    }
    return(
        <>
            <Menu mode="horizontal">
                <Menu.Item key="home" ><Link href="/"><a><Icon style={{margin:0}} type="home" /></a></Link></Menu.Item>
                <Menu.Item key="profile" ><Link href="/profile"><a><Icon style={{margin:0}} type="user" /></a></Link></Menu.Item>
                <Menu.Item>
                    <Input.Search
                      enterButton
                      style={{verticalAlign:"middle"}}
                      onSearch={onSearch}
                    />
                </Menu.Item>
            </Menu>
            <Row>
                <Col style={{padding:'12px 0'}} xs={24} md={6}>{ me && me.id !== undefined ? <Profile/> : <LoginForm/> }</Col>
                <Col style={{padding:'12px 30px'}} xs={24} md={13}>{children}</Col>
                <Col style={{padding:'12px 30px'}} xs={24} md={5} >
                    <div style={{bottom:0}}>Made By Geonil Jang</div>
                </Col>
            </Row>
        </>
    )
}



export default AppLayout;
