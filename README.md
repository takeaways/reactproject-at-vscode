"# reactproject-at-vscode"
### front setting
<pre>
<code>
  npm i next react react-dome antd styled-components
  npm i -D webpack eslint nodemon

  .eslintrc
  {
    "parserOptions":{
        "ecmaVersion":2019,
        "sourceType":"module",
        "ecmaFeatures":{
            "jsx":true
        }
    },
    "env":{
        "brower":true,
        "node":true
    },
    "extends":[
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "plugins":[
        "import",
        "react-hooks"
    ]
}
</code>
</pre>

### next 라우팅 시스템
<pre>
<code>
  pages 페이지 내부에 만들어지 파일명으로 라우팅을 합니다.
  메인페이지는 index.js 으로
</code>
</pre>

### 리덕스
<pre>
<code>

    npm i redux react-redux next-redux-wrapper
    리듀서와 액션 --> ( createContext + useContext + useReducer )

    1) 관리하기 힘든 스테이트 관리
       리덕스, 모벡스, 그래프큐엘

    2) 액션 -> 스테이트를 바꾸는행동
       dispatch -> Action 실행  [ const [state, dispatch] = useReducer(reducer, initialState) ]
       Reducer(함수) -> action의 결과로 스테이트를 어떻게 바꿀지 정의


    <Provider store={store}>

    기존 함수 확장
    const withRedux = (fn) => (app) => {
        <app store={fn}/>
    }

    ==> <App store={store}/>


</code>
</pre>

### 리덕스 사가 - 비동기 처리
<pre>
<code>
    [1] takeLatest, takeEvery
    [2] call, fork => 둘 다 함수를 실행 하지만 call(동기 호출) fork(비동기 호출)
</code>
</pre>

### sequelize-cli
<pre>
<code>
    npm i -g seqeulize-cli
    seqeulize init

</code>
</pre>

### passport
<pre>
<code>
    1) passportConfig -> 를 통해서 [serialize, deserialize, localStrategy] 연결,
    2) passport.initialize() + session() 연결
    3) http 요청이 들어오면 무조건 deserialize 무조건 실행
    4) login 라우터로 들어 올 때  정의해둔 local strategy 사용 발생.
    4-1) passport.authenticate('local',(error, user,info)=>{
        req.login // serialize 실행
    })
</code>
</pre>

### 넥스트랑 익스프레스 연결하기
<pre>
<code>
  핵심의 getInitialProps !!!
</code>
</pre>
