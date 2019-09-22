import {all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { 
    LOG_IN_REQUEST,LOG_IN_SUCCESS,LOG_IN_FAILURE, 
    SIGN_UP_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_FAILURE, 
    LOG_OUT_REQUEST,LOG_OUT_FAILURE,LOG_OUT_SUCCESS, 
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
} from '../reducers/user'


// login // 
function loginAPI(loginData){
    return axios.post('/user/login', loginData, {
        withCredentials:true,
    })
}

function* login(action){
    try{
        const result = yield call(loginAPI, action.data)
        yield put({
            type:LOG_IN_SUCCESS,
            data:result.data
        })
    }catch(e){
        console
        yield put({
            type:LOG_IN_FAILURE,
            error:e
        })
    }
}

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login)
}


// signup //
function* watchSignup(){
    yield takeLatest(SIGN_UP_REQUEST, signup);
}
function* signup(action){
    try{
        const result = yield call(signupAPI, action.data);
        yield put({
            type:SIGN_UP_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        yield put({
            type:SIGN_UP_FAILURE,
            error:e
        })
    }
}
function signupAPI(signupData){
    return axios.post(`user/`, signupData)
}

// logout //
function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logout);
}
function* logout(){
    try{
        const result = yield call(logoutAPI);
        yield put({
            type:LOG_OUT_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        put({
            type:LOG_OUT_FAILURE,
            error:e
        })
    }
}
function logoutAPI(){
    return axios.post('user/logout',{},{
        withCredentials:true,
    });
}


// loadUser  //
function* watchLoadUser(){
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
function* loadUser(){
    try{
        const result = yield call(loadUserAPI);
        yield put({
            type:LOAD_USER_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        put({
            type:LOAD_USER_FAILURE,
            error:e
        })
    }
}
function loadUserAPI(){
    return axios.get('user/',{
        withCredentials:true,
    });
}





export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchSignup),
        fork(watchLogout),
        fork(watchLoadUser),
    ])
}