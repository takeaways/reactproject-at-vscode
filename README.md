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

    npm i react-redux
    리듀서와 액션 --> ( createContext + useContext + useReducer ) 

    1) 관리하기 힘든 스테이트 관리
       리덕스, 모벡스, 그래프큐엘
</code>
</pre>
