import React,{useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {REMOVE_IMAGE} from '../reducers/post';

function PreShowImage({imagePaths}){
    const dispatch = useDispatch();
    const onDeleteImage = useCallback( index => () => {
      dispatch({
        type:REMOVE_IMAGE,
        index,
      })
    },[]);


    return(
        <div style={{border:'1px solid #ccc', width:'100%', padding:'3px', display:'inline-block', }}>
            { imagePaths && imagePaths.map( (image, i) => (
                <span key={i} onClick={onDeleteImage(i)} title="제거" style={{cursor:'pointer'}}>
                    <img style={{margin:'0 1%',width:'23%',marginBottom:'3px'}} src={`http://localhost:8080/${image}`} alr ={image} key={i}/>
                </span>
            ))}
        </div>
    )
}

export default PreShowImage;
