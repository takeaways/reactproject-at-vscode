import React from 'react';

function User(){
  return(
    <>hah</>
  )
}

User.getInitialProps = async (context) => {
  const id = context.query.id;
  console.log(id)
}

export default User
