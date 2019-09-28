import React from 'react';
import Link from 'next/link';


const PostCardContent = ({postData}) => {
  return (
    <div>
      {postData.split(/(#[^\s]+)/g).map( (v,i)=>{
                  if(v.match(/#[^\s]+/g)) return <Link key={v+i} href={{pathname: `/hashtag`, query:{tag:v.slice(1)}}} as={`/hashtag/${v.slice(1)}`}><a>{v}</a></Link>
                  return v
      })}
    </div>
  )
}

export default PostCardContent;
