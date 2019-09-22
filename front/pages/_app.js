import React from 'react';
import Head from 'next/head';

import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';

import AppLayout from '../components/AppLayout';
import rootReducer from '../reducers';
import rootSaga from '../sagas';




function App({Component, store, pageProps}){
    return (
        <Provider store={store}>
            <Head>
                <title>이야기 터</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <AppLayout>
                <Component {...pageProps}/>
            </AppLayout>
        </Provider>
    )
}

App.getInitialProps = async (context) => {
  const {ctx, Component} = context;
  let pageProps = {};
  if(Component.getInitialProps){
    pageProps = await Component.getInitialProps(ctx);
  }
  return {pageProps};
};


const configStore = (initialState, options) => {

    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : compose(applyMiddleware(...middlewares),
            typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
                ? window.__REDUX_DEVTOOLS_EXTENSION__()
                : (f) => f,
            )

    const store = createStore(rootReducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
}

export default withRedux(configStore)(App);

/*
    기존 함수 확장
    const withRedux = (fn) => (app) => {
        <app store={fn}/>
    }

    ==> <App store={store}/>

*/
