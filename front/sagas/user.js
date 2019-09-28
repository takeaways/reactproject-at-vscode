import {all, fork, put, takeLatest,takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import {
    UNFOLLOW_USER_REQUEST,UNFOLLOW_USER_SUCCESS,UNFOLLOW_USER_FAILURE,
    FOLLOW_USER_REQUEST,FOLLOW_USER_SUCCESS,FOLLOW_USER_FAILURE,
    LOG_IN_REQUEST,LOG_IN_SUCCESS,LOG_IN_FAILURE,
    EDIT_NICKNAME_REQUEST,EDIT_NICKNAME_SUCCESS,EDIT_NICKNAME_FAILURE,
    SIGN_UP_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_FAILURE,
    LOG_OUT_REQUEST,LOG_OUT_FAILURE,LOG_OUT_SUCCESS,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
    REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE,
    LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE,
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
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}
function* loadUser(action){
    try{
        const result = yield call(loadUserAPI, action.data);
        yield put({
            type:LOAD_USER_SUCCESS,
            data:result.data,
            me:!action.data
        })
    }catch(e){
        console.error(e);
        put({
            type:LOAD_USER_FAILURE,
            error:e
        })
    }
}
function loadUserAPI(userId){
    return axios.get(!userId ?  'user/' : `user/${userId}`, {
        withCredentials:true,
    });
}

// FOLLOW  //
function* watchFollow(){
    yield takeEvery(FOLLOW_USER_REQUEST, followUser);
}
function* followUser(action){
    try{
        const result = yield call(followUserAPI, action.data);
        yield put({
            type:FOLLOW_USER_SUCCESS,
            data:result.data,
        })
    }catch(e){
        console.error(e);
        put({
            type:FOLLOW_USER_FAILURE,
            error:e
        })
    }
}
function followUserAPI(userId){
    return axios.post(`/user/${userId}/follow`, {}, {
        withCredentials:true,
    });
}

// UNFOLLOW  //
function* watchUnFollow(){
    yield takeEvery(UNFOLLOW_USER_REQUEST, unFollowUser);
}
function* unFollowUser(action){
    try{
        const result = yield call(unFollowUserAPI, action.data);
        yield put({
            type:UNFOLLOW_USER_SUCCESS,
            data:result.data,
        })
    }catch(e){
        console.error(e);
        put({
            type:UNFOLLOW_USER_FAILURE,
            error:e
        })
    }
}
function unFollowUserAPI(userId){
    return axios.delete(`/user/${userId}/follow`, {
        withCredentials:true,
    });
}

// watchLoadFollowers  //
function* watchLoadFollowers(){
    yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* loadFollowers(action){
    try{
        const result = yield call(loadFollowersAPU, action.data);
        yield put({
            type:LOAD_FOLLOWERS_SUCCESS,
            data:result.data,
        })
    }catch(e){
        console.error(e);
        put({
            type:LOAD_FOLLOWERS_FAILURE,
            error:e
        })
    }
}
function loadFollowersAPU(userId){
    return axios.get(`/user/${userId}/followers`, {
        withCredentials:true,
    });
}

// watchLoadFollowings  //
function* watchLoadFollowings(){
    yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollwings);
}
function* loadFollwings(action){
    try{
        const result = yield call(loadFollowings, action.data);
        yield put({
            type:LOAD_FOLLOWINGS_SUCCESS,
            data:result.data,
        })
    }catch(e){
        console.error(e);
        put({
            type:LOAD_FOLLOWINGS_FAILURE,
            error:e
        })
    }
}
function loadFollowings(userId){
    return axios.get(`/user/${userId}/followings`, {
        withCredentials:true,
    });
}

// watchRemoveFollowers  //
function* watchRemoveFollowers(){
    yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollowers);
}
function* removeFollowers(action){
    try{
        const result = yield call(removeFollowersAPI, action.data);
        yield put({
            type:REMOVE_FOLLOWER_SUCCESS,
            data:result.data,
        })
    }catch(e){
        console.error(e);
        put({
            type:REMOVE_FOLLOWER_FAILURE,
            error:e
        })
    }
}
function removeFollowersAPI(userId){
    return axios.delete(`/user/${userId}/follower`, {
        withCredentials:true,
    });
}

// editNickname  //
function* watchEditNickname(){
    yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname);
}
function* editNickname(action){
    try{
        const result = yield call(editNicknameAPI, action.data);
        yield put({
            type:EDIT_NICKNAME_SUCCESS,
            data:result.data,
        })
    }catch(e){
        console.error(e);
        put({
            type:EDIT_NICKNAME_FAILURE,
            error:e
        })
    }
}
function editNicknameAPI(newName){
    return axios.patch(`/user/nickname`, {nickname:newName}, {
        withCredentials:true,
    });
}




export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchSignup),
        fork(watchLogout),
        fork(watchLoadUser),
        fork(watchUnFollow),
        fork(watchFollow),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollowers),
        fork(watchEditNickname),
    ])
}
