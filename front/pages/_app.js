import React from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';

import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import withReduxSaga from 'next-redux-saga';
import {Container} from 'next/app';

import AppLayout from '../components/AppLayout';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import {LOAD_USER_REQUEST} from '../reducers/user'



function App({Component, store, pageProps}){
    return (
      <Container>
        <Provider store={store}>
          <Helmet
            title="이야기 터"
            htmlAttributes={{lang:'ko'}}
            meta={[{
              charset:'UTF-8',
            },{
              name:'viewport',content:'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover'
            },{
              'http-equiv':'X-UA-Compatible', content:'IE=edge'
            },{
              name:'description', content:'Dev Jangs story'
            },{
              name:'og:title', content:`이야기 터`
            },{
              property:'og:type',content:'website'
            },{
              property:'og:image',content: 'http://localhost:3060/favicon.ico',
            }]}
            link={[{
              rel:'stylesheet', href:"https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
            },{
              rel:'stylesheet', href:"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            },{
              rel:'stylesheet', href:"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            },{
              rel:'shortcut icon', href: '/favicon.ico',
            }]}
          />
            <AppLayout>
                <Component {...pageProps}/>
            </AppLayout>
        </Provider>
      </Container>
    )
}

App.getInitialProps = async (context) => {
  const {ctx, Component} = context;

  const cookie = ctx.isServer ? ctx.req.headers.cookie : null;
  if(ctx.isServer && cookie){
    axios.defaults.headers.Cookie = cookie;
  }

  const state  = ctx.store.getState();
  if(!state.user.me){
    ctx.store.dispatch({
      type:LOAD_USER_REQUEST
    });
  }


  let pageProps = {};
  if(Component.getInitialProps){
    pageProps = await Component.getInitialProps(ctx);
  }
  return {pageProps};
};


const configStore = (initialState, options) => {

    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware];
    /*
    (store)=>(next)=>(action)=>{
     console.log(action);
     next(action);
   }
    */
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : compose(applyMiddleware(...middlewares),
            typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
                ? window.__REDUX_DEVTOOLS_EXTENSION__()
                : (f) => f,
            )

    const store = createStore(rootReducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

export default withRedux(configStore)(withReduxSaga(App));

/*
    기존 함수 확장
    const withRedux = (fn) => (app) => {
        <app store={fn}/>
    }

    ==> <App store={store}/>

*/
