import React, {useState,useCallback} from 'react';
import {Icon} from 'antd';
import ImagesZoom from './ImagesZoom';

const PostImages = ({images}) => {

  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(()=>{
    setShowImagesZoom(true);
  },[]);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  },[]);

  if(images.length === 1){
    return (
      <>
        <img src={`http://localhost:8080/${images[0].src}`} onClick={onZoom}/>
        {showImagesZoom && <ImagesZoom key={"image1"} images={images} onClose={onClose}/>}
      </>
    )
  }
  if(images.length === 2){
    return(
      <>
      <div>
        <img width="50%" src={`http://localhost:8080/${images[0].src}`} onClick={onZoom}/>
        <img width="50%" src={`http://localhost:8080/${images[0].src}`} onClick={onZoom}/>
      </div>
      {showImagesZoom && <ImagesZoom key={"image2"} images={images} onClose={onClose}/>}
      </>
    )
  }
  return (
    <>
      <div>
        <img width="50%" src={`http://localhost:8080/${images[0].src}`} onClick={onZoom}/>
        <div style={{display:'inline-block', width:"50%", textAlign:'center',verticalAlign:'middle'}} onClick={onZoom}>
          <Icon type="plus"/>
          <br/>
          {images.length - 1}개 사진 더 보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom key={"imagem"} images={images} onClose={onClose}/>}
    </>
  )
}

export default PostImages;
