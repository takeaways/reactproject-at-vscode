export const initialState = {
    mainPosts:[],
    imagePaths: [], // 미리보기 이미지 경로
    addPostErrorReason: '', // 포스트 업로드 실패 사유
    isAddingPost: false, // 포스트 업로드 중
    postAdded: false, // 포스트 업로드 성공
    isAddingComment: false,
    addCommentErrorReason: '',
    commentAdded: false,
    retweeted:false,
    hasMorePost:false,
    singlePost:null,
  }

export const ADD_POST = 'ADD_POST';
export const ADD_DUMMY = 'ADD_DUMMY';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';


export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';


export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_POST_REQUEST:{
            return {
                ...state,
                postAdded:false,
                isAddingPost:true,
                addPostErrorReason:'',
            }
        }
        case ADD_POST_SUCCESS:{
            return {
                ...state,
                isAddingPost:false,
                postAdded:true,
                mainPosts:[action.data, ...state.mainPosts]
            }
        }
        case ADD_POST_FAILURE:{
            return {
                ...state,
                isAddingPost:false,
                postAdded:false,
                addPostErrorReason:action.error
            }
        }
        case LOAD_MAIN_POSTS_REQUEST:{
            return {
                ...state,
                mainPosts:[]
            }
        }
        case LOAD_MAIN_POSTS_SUCCESS:{
            return {
                ...state,
                mainPosts:action.data
            }
        }
        case LOAD_MAIN_POSTS_FAILURE:{
            return {
                ...state,
            }
        }
        case ADD_COMMENT_REQUEST:{
            return {
                ...state,
                commentAdded:false,
                isAddingComment:true,
                addCommentErrorReason:'',
            }
        }
        case ADD_COMMENT_SUCCESS:{
            const postIndex = state.mainPosts.findIndex( v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            //const Comments = [...post.Comments, action.data.commenet];
            const Comments = [...post.Comments, dummyComment];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post, Comments}

            return {
                ...state,
                isAddingComment:false,
                commentAdded:true,
                mainPosts
            }
        }
        case ADD_COMMENT_FAILURE:{
            return {
                ...state,
                isAddingComment:false,
                commentAdded:false,
                addCommentErrorReason:action.error
            }
        }

        default:{
            return {
                ...state,
            }
        }
    }
}

export default reducer
