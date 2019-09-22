import {all,takeLatest,fork,call, put, delay} from 'redux-saga/effects'
import axios from 'axios';
import {
    ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST,
    ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST,
    LOAD_MAIN_POSTS_SUCCESS, LOAD_MAIN_POSTS_FAILURE, LOAD_MAIN_POSTS_REQUEST,
} from '../reducers/post';


// addpost
function addPostAPI(postData){
  return axios.post('/post/', postData, {
    withCredentials:true,
  })
}

function* addPost(action){
    try{
        const result = yield call(addPostAPI, action.data)
        yield put({
            type:ADD_POST_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        yield put({
            type:ADD_POST_FAILURE,
            error:e
        })
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost)
}


// addComment
function addCommentAPI(){

}

function* addComment(action){
    try{
        yield delay(2000)
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data:{postId: action.data.postId}
        })
    }catch(e){
        console.error(e);
        yield put({
            type:ADD_COMMENT_FAILURE,
            error:e
        })
    }
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

// loadPost
function loadPostsAPI(postData){
  return axios.get('/posts')
}

function* loadPosts(action){
    try{
        const result = yield call(loadPostsAPI)
        yield put({
            type:LOAD_MAIN_POSTS_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        yield put({
            type:LOAD_MAIN_POSTS_FAILURE,
            error:e
        })
    }
}

function* watchLoadPosts(){
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadPosts)
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadPosts)
    ])
}
