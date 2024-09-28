import React,{useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDisptach, RootState } from '../../../../redux/Store'
import { fetchGifsByTerm } from '../../../../redux/Slices/GifSlice';


interface FeedPostFrozenGifProps{
    image:string;
    text:string
}


export const FeedPostFrozenGif:React.FC<FeedPostFrozenGifProps> = ({image,text}) => {
    const perview=useSelector((state:RootState)=> state.gif.perview)
    const dispatch:AppDisptach = useDispatch();

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    const freezeGif = () =>{
      if(canvasRef && canvasRef.current && imageRef.current && imageRef){
        let width=290;
        let hight=150;
        canvasRef.current.width=width
        canvasRef.current.height=hight
        const ctx = canvasRef.current.getContext("2d")

        if(ctx !=null && perview){
          ctx.font ="bold 32px Arial"
          ctx.textAlign="left"
          ctx.fillStyle="white"
          ctx.drawImage(imageRef.current,0,0,width,hight)
          ctx.fillText(text,(12),(138))
        }
      }
    }

    const handleCanvasClicked  = () =>{
        //pending to hanlde the logic
        if(perview)
        dispatch(fetchGifsByTerm(text))
        
    } 

  return (
    <>
      <img src={image} ref={imageRef} onLoad={freezeGif} alt={image} hidden />
      <canvas ref={canvasRef} onClick={handleCanvasClicked}></canvas>
    </>
  );
}
 