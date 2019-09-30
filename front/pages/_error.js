import React from 'react';
import Error from 'next/error';

const MyError = ({statusCode}) => {
  return (
    <div>
      <h1>{statusCode}에러발생</h1>
      <Error statusCode={statusCode}/>
    </div>
  )
}

MyError.getInitialProps = async (context) => {
  const statusCode = context.res ? context.res.statusCode : context.err ? err.statusCode: null;
  return {statusCode}
}


export default MyError;
