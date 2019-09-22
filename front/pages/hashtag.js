import React from 'react';

function Hashtag({tag}){
  return(
    <>{tag}</>
  )
}

Hashtag.getInitialProps = async (context) => {
  const tag = context.query.tag;
  console.log(tag)
  return {tag}
}

export default Hashtag
