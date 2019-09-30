import {all,takeLatest,throttle,fork,call, put, delay} from 'redux-saga/effects'
import axios from 'axios';
import {
    ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST,
    ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST,
    LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE, LOAD_COMMENTS_REQUEST,
    LOAD_MAIN_POSTS_SUCCESS, LOAD_MAIN_POSTS_FAILURE, LOAD_MAIN_POSTS_REQUEST,
    LOAD_HASHTAG_POSTS_REQUEST,LOAD_HASHTAG_POSTS_SUCCESS,LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_USER_POSTS_SUCCESS,LOAD_USER_POSTS_FAILURE,LOAD_USER_POSTS_REQUEST,
    UPLOAD_IMAGES_SUCCESS,UPLOAD_IMAGES_FAILURE,UPLOAD_IMAGES_REQUEST,
    UNLIKE_POST_REQUEST, UNLIKE_POST_FAILURE, UNLIKE_POST_SUCCESS,
    LIKE_POST_REQUEST, LIKE_POST_FAILURE, LIKE_POST_SUCCESS,
    RETWEET_REQUEST, RETWEET_FAILURE, RETWEET_SUCCESS,
    LOAD_POST_REQUEST, LOAD_POST_FAILURE, LOAD_POST_SUCCESS,
    REMOVE_POST_REQUEST, REMOVE_POST_FAILURE, REMOVE_POST_SUCCESS,
} from '../reducers/post';
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from '../reducers/user';

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
        yield put({
          type:ADD_POST_TO_ME,
          data:result.data.id,
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
function addCommentAPI(commentData){
  const id = commentData.postId
  return axios.post(`/post/${id}/comment`, commentData, {
    withCredentials:true
  })
}

function* addComment(action){
    try{
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data:result.data,
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
function loadPostsAPI(lastId = 0, limit = 10){
  return axios.get(`/posts?lastId=${lastId}&limit=${limit}`)
}

function* loadPosts(action){
    try{
        const result = yield call(loadPostsAPI, action.lastId)
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
    yield throttle(2000, LOAD_MAIN_POSTS_REQUEST, loadPosts)
}

// hashtag
function loadHashtagAPI(tag, lastId=0 , limit=10){
  return axios.get(`/hashtag/${encodeURIComponent(tag)}?lastId=${lastId}&limit=${limit}`)
}

function* loadHashtag(action){
    try{
        const result = yield call(loadHashtagAPI, action.data, action.lastId)
        yield put({
            type:LOAD_HASHTAG_POSTS_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        yield put({
            type:LOAD_HASHTAG_POSTS_FAILURE,
            error:e
        })
    }
}

function* watchLoadHashtag(){
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtag)
}


// loadUserPosts
function loadUserPostsAPI(id){
  return axios.get(`user/${id | 0}/posts`)
}

function* loadUserPosts(action){
    try{
        const result = yield call(loadUserPostsAPI, action.data)
        yield put({
            type:LOAD_USER_POSTS_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        yield put({
            type:LOAD_USER_POSTS_FAILURE,
            error:e
        })
    }
}

function* watchLoadUserPosts(){
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts)
}

// loadComments
function loadCommentAPI(id){
  return axios.get(`/post/${id}/comments`);
}

function* loadComment(action){
    try{
        const result = yield call(loadCommentAPI,action.data);
        yield put({
            type:LOAD_COMMENTS_SUCCESS,
            data:{
              PostId:action.data,
              content:result.data,
            }
        })
    }catch(e){
        console.error(e);
        yield put({
            type:LOAD_COMMENTS_FAILURE,
            error:e
        })
    }
}

function* watchLoadComments(){
    yield takeLatest(LOAD_COMMENTS_REQUEST, loadComment)
}

// uploadImages
function uploadImagesAPI(formData){
  return axios.post(`/post/images`,formData,{
    withCredentials:true,
  });
}

function* uploadImages(action){
    try{
        const result = yield call(uploadImagesAPI,action.data);
        yield put({
            type:UPLOAD_IMAGES_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        yield put({
            type:UPLOAD_IMAGES_FAILURE,
            error:e
        })
    }
}

function* watchLoadImages(){
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}

// UnlikPost
function unListPostAPI(postId){
  return axios.delete(`/post/${postId}/like`,{
    withCredentials:true,
  });
}

function* unLikePost(action){
    try{
        const result = yield call(unListPostAPI,action.data);
        yield put({
            type:UNLIKE_POST_SUCCESS,
            data:{
              postId:action.data,
              userId:result.data.userId
            }
        })
    }catch(e){
        console.error(e);
        yield put({
            type:UNLIKE_POST_FAILURE,
            error:e
        })
    }
}

function* watchUnlikePost(){
    yield takeLatest(UNLIKE_POST_REQUEST, unLikePost)
}

// likPost
function listPostAPI(postId){
  return axios.post(`/post/${postId}/like`,{},{
    withCredentials:true,
  });
}

function* likePost(action){
    try{
        const result = yield call(listPostAPI,action.data);
        yield put({
            type:LIKE_POST_SUCCESS,
            data:{
              postId:action.data,
              userId:result.data.userId
            }
        })
    }catch(e){
        console.error(e);
        yield put({
            type:LIKE_POST_FAILURE,
            error:e
        })
    }
}

function* watchLikePost(){
    yield takeLatest(LIKE_POST_REQUEST, likePost)
}

// Retweet
function retweetAPI(postId){
  return axios.post(`/post/${postId}/retweet`,{},{
    withCredentials:true,
  });
}

function* retweet(action){
    try{
        const result = yield call(retweetAPI,action.data);
        yield put({
            type:RETWEET_SUCCESS,
            data:result.data
        })
    }catch(e){
        alert(e.response.data)
        console.error(e);
        yield put({
            type:RETWEET_FAILURE,
            error:e
        })
    }
}

function* watchRetweet(){
    yield takeLatest(RETWEET_REQUEST, retweet)
}

// removePost
function removePostAPI(postId){
  return axios.delete(`/post/${postId}/`,{
    withCredentials:true,
  });
}

function* removePost(action){
    try{
        const result = yield call(removePostAPI,action.data);
        yield put({
            type:REMOVE_POST_OF_ME,
            data:result.data
        })
        yield put({
            type:REMOVE_POST_SUCCESS,
            data:result.data
        })
    }catch(e){
        alert(e.response.data)
        console.error(e);
        yield put({
            type:REMOVE_POST_FAILURE,
            error:e
        })
    }
}

function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
}


// loadpostrequest
function loadPostAPI(postId){
  return axios.get(`/post/${postId}`);
}

function* loadPost(action){
    try{
        const result = yield call(loadPostAPI,action.data);
        yield put({
            type:LOAD_POST_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        yield put({
            type:LOAD_POST_FAILURE,
            error:e
        })
    }
}

function* watchLoadPost(){
    yield takeLatest(LOAD_POST_REQUEST, loadPost)
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadPosts),
        fork(watchLoadImages),
        fork(watchLoadComments),
        fork(watchLoadHashtag),
        fork(watchLoadUserPosts),
        fork(watchUnlikePost),
        fork(watchLikePost),
        fork(watchRetweet),
        fork(watchRemovePost),
        fork(watchLoadPost),
    ])
}
