import React from 'react';

function PreShowImage({imagePaths}){
    return(
        <div style={{border:'1px solid #ccc', width:'100%', padding:'3px', display:'inline-block', }}>
            { imagePaths && imagePaths.map( (image, i) => (
                <span key={i} title="제거" style={{cursor:'pointer'}}>
                    <img style={{margin:'0 1%',width:'23%',marginBottom:'3px'}} src={image} alr ={image} key={i}/> 
                </span>
            ))}
        </div>
    )
}

export default PreShowImage;