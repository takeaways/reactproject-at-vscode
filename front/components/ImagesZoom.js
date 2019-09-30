import React,{useState} from 'react';
import Slick from 'react-slick';
import {Icon} from 'antd';
import styled from 'styled-components';



const Overlay = styled.div`
  position:fixed;
  z-index:5000;
  top:0;
  left:0;
  right:0;
  bottom:0;
`
const H1 = styled.h1`
  margin:0;
  font-size:'17px';
  color:'#333';
  line-height:'44px';
`

const ImagesZoom = ({images, onClose}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return(
    <Overlay style={{position:'fixed', zIndex:5000, top:0,left:0,right:0,bottom:0}}>
      <header style={{height:44,background:'white',position:'relative', padding:0, textAlign:'center'}}>
        <H1 style={{margin:0,fontSize:'17px',color:'#333',lineHeight:'44px'}}>상세 이미지</H1>
        <Icon style={{position:'absolute',right:0,top:0,padding:15,lineHeight:'14px', cursor:'pointer'}} type="close" onClick={onClose} />
      </header>
      <div style={{height:'calc(100% - 44px)', background:'#090909'}}>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite={false}
            arrows
            slideToShow={1}
            slideToScrol={1}
          >
            {images.map(v=>{
              return (
                <div key={v.src}>
                  <img src={`http://localhost:8080/${v.src}`}  alt={v.src} style={{margin:'0 auto', maxHeight:750}}/>}
                </div>
              )
            })}
          </Slick>
          <div style={{textAlign:'center'}}>
            <div style={{width:75, height:30,lineHeight:'30px',borderRadius:15, background:'#313131', display:'inline-block',textAlign:'center'}}>
              {currentSlide + 1 } / {images.length}
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  )
}

export default ImagesZoom;
