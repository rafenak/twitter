import React,{useEffect, useRef, useState} from 'react'
import './FeedPostGifCreatorModalDisplay.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDisptach, RootState } from '../../../../redux/Store'
import { fetchNextGifs } from '../../../../redux/Slices/GifSlice'
import { FeedPostFrozenGif } from '../FeedPostFrozenGif/FeedPostFrozenGif'
import { PostImage } from '../../../../utils/GlobalInterfaces'
import { updateCurrentPost } from '../../../../redux/Slices/PostSlice'
import { updateDisplayGif } from '../../../../redux/Slices/ModalSlice'


interface FeedPostGifCreatorModalDisplayProps{
    gifs:string[]
}
export const FeedPostGifCreatorModalDisplay:React.FC<FeedPostGifCreatorModalDisplayProps> = ({gifs}) => {
    const state = useSelector((state:RootState)=>state.gif);
    const disptach:AppDisptach = useDispatch();
    const hiddenDiv = useRef<HTMLDivElement>(null);
    const [autoPlay,setAutoPlay] = useState<boolean>(true);

    const loadNextGifs = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          disptach(
            fetchNextGifs({
              term: state.searchTerm,
              next: state.next,
            })
          );
        }
      });
    };

    const toggleAutoPlay = () =>{
        setAutoPlay(!autoPlay) 
    }

    const attachedGifPost = (e:React.MouseEvent<HTMLImageElement>) =>{
        let postImage:PostImage ={
            imageId:0,
            imageName: `${state.searchTerm}-gif`,
            imageType: 'gif',
            imageUrl: e.currentTarget.id
        }

        let imgs = [postImage];
        disptach(updateCurrentPost({
            name:"images",
            value:imgs
        }))

        disptach(updateDisplayGif())

    }
    useEffect(() => {
      if(hiddenDiv && hiddenDiv.current){
        const observer = new IntersectionObserver(loadNextGifs,{
            root:null,
            threshold:1
        });
        const target = hiddenDiv.current;
        observer.observe(target);
      }
    }, [])
    
    
  return (
    <div className='feed-post-creator-gif-modal-display'>
        <div className='feed-post-creator-gif-modal-display-auto-selection'>
            <p className='feed-post-creator-gif-modal-display-auto-text'>Auto-Play Gifs</p>
            <label className='feed-post-creator-gif-modal-switch'>
                <input type='checkbox' onClick={toggleAutoPlay} checked={autoPlay} readOnly/>
                <span className='feed-post-creator-gif-modal-slider'></span>
            </label> 
        </div>
        <div className='feed-post-creator-gif-modal-display-gif-container'>
            { autoPlay ?
            gifs.map((gif,index)=> <img  className='feed-post-creator-gif-modal-display-gif' 
                    src={gif} key={`${gif}-${index}`} alt={gif} id={gif} onClick={attachedGifPost}/> )
            : gifs.map((gif,index)=> <FeedPostFrozenGif image={gif} text={state.searchTerm} key={`${gif}-${index}`}/>)}
        </div>
        <div id="autoload" ref={hiddenDiv} hidden={state.gifs.length===0}> </div>
    </div>
  )
}
