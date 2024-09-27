import React ,{useState,useEffect,useRef} from 'react'

import { Close,Search } from '@mui/icons-material'
import { AppDisptach, RootState } from '../../../../redux/Store'
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayGif } from '../../../../redux/Slices/ModalSlice'

import './FeedPosterGifCreatorModalTop.css'
import { clearGifs, updateSerachTerm } from '../../../../redux/Slices/GifSlice'

export const FeedPosterGifCreatorModalTop:React.FC = () => {

    const searchTerm = useSelector((state:RootState)=> state.gif.searchTerm)
    const dispatch:AppDisptach = useDispatch();
    const [inputFocused,setInputFocused] = useState<boolean>(false)
    // const [inputValue,setInputValue] = useState<string>("")
    const inputref = useRef<HTMLInputElement>(null); 

    const handleFocus =()=>{
        if(!inputFocused){
            setInputFocused(true)
        }
    }
    const handleBlur =(e:React.FocusEvent<HTMLInputElement>) =>{
        e.preventDefault()
        const relatedTarget:any  = e.nativeEvent.relatedTarget;

        if(relatedTarget && relatedTarget.id ==='clear'){
            clearInput();
        }else{
            setInputFocused(false)
        }
    }
    const handleChangeValue =  (e:React.ChangeEvent<HTMLInputElement>)  => {
        //Searching logic goes
        // setInputValue(e.target.value)
        dispatch(updateSerachTerm(e.target.value) )
    }

    const hanldeCloseModal=()=>{
        dispatch(updateDisplayGif()) 
    }

    const clearInput = () =>{
        dispatch(updateSerachTerm(""))
        dispatch(clearGifs())
        setInputFocused(false)

        if(inputref && inputref.current){
            inputref.current.focus();
        }
    } 

  return (
    <div className='feed-post-creator-gif-modal-top'>
        <div className='feed-post-creator-gif-modal-top-close-bg' onClick={hanldeCloseModal}>
            <Close sx={{fontSize: '20px'}} />
        </div>
        <label htmlFor={'gif-search'} className={inputFocused ? 'feed-post-creator-gif-modal-top-input-wrapper input-wrapper-active' : 
            "feed-post-creator-gif-modal-top-input-wrapper input-wrapper-inactive"}>
                <div className='feed-post-creator-gif-modal-search'>
                    <Search sx={{fontSize: '20px' , 
                        color:'rgb(83,100,113)'}}/>
                </div>
                <input id='gif-search' style={!inputFocused && searchTerm.length > 0 ? {width:`${searchTerm .length + 1}ch`} : {}} 
                className='feed-post-creator-gif-modal-top-input' placeholder='Search for GIFs' 
                    value={searchTerm} 
                    onChange={handleChangeValue} onBlur={handleBlur} onFocus={handleFocus} ref={inputref}/>
                    {searchTerm && inputFocused ? <div className='feed-post-creator-gif-modal-top-clear-border'>
                        <button id="clear" className='feed-post-creator-gif-top-clear-input'>x</button>
                    </div> : <></>}
            </label>
            
    </div> 

  )
}
