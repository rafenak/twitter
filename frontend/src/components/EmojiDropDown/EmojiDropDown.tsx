import React, { useEffect,useState } from 'react'

import { generateActivities, generateAninamlAndNature, generateFlags, generateFoodAndDrink, generateObjects, generateSimleyAndPeople, generateSymbols, generateTopRows, generateTravelAndPlaces } from '../../utils/EmojiUtils'

import './EmojiDropDown.css'
import SearchIcon from '@mui/icons-material/Search'


export const EmojiDropDown:React.FC = () => {
  
  const [activeCategory, setActiveCategory] = useState<number>(1);


  return (
    <div className='emoji-drop-down'>
        <div className='emoji-drop-down-top'>
          <div className='emoji-drop-down-search-border'>
            <SearchIcon />
            <input className='emoji-drop-down-search' type='' id='emoji-search' onChange={()=>{}} />
          </div>
          <div className='emoji-drop-down-categories'>
            {generateTopRows().map((img,index)=> {
                if(activeCategory===index){
                  return <div key={index} id={`${index}`} className='emoji-drop-down-category emoji-active' style={{
                    backgroundImage: `url("${img}")`,
                    // backgroundSize: "cover",
                    // filter: 'grayscale(100%)'
                    }}> </div>
                    }else{
                      return  <div key={index} id={`${index}`} className='emoji-drop-down-category emoji-inactive' style={{
                        backgroundImage: `url("${img}")`,
                        // backgroundSize: "cover",
                        // filter: 'grayscale(100%)'
                        }}> </div>
                    }
                }
            )}
          </div>
        </div>
        <div className='emoji-drop-down-selector'>
            <div className='emoji-drop-down-selector-section' id="Smileys & Emotion">
              <h2 className='emoji-drop-down-selector-section-title'>Smileys & Emotion</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateSimleyAndPeople().map((emoji,index)=>{
                   return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
                  })}
                 </div>
            </div>
            <div className='emoji-drop-down-selector-section' id="Animals & Nature">
              <h2 className='emoji-drop-down-selector-section-title'>Animals & Nature</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateAninamlAndNature().map((emoji,index)=>{
                   return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
                  })}
                  </div>
            </div>
            <div className='emoji-drop-down-selector-section' id="Food & Drink">
             <h2 className='emoji-drop-down-selector-section-title'>Food & Drink</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateFoodAndDrink().map((emoji,index)=>{
                   return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
                  })}
                  </div>
            </div>
            <div className='emoji-drop-down-selector-section' id="Activities">
                <h2 className='emoji-drop-down-selector-section-title'>Activities</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateActivities().map((emoji,index)=>{
                   return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
                  })}
                  </div>
            </div>
            <div className='emoji-drop-down-selector-section' id="Travel & Places">
            <h2 className='emoji-drop-down-selector-section-title'>Travel & Places</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateTravelAndPlaces().map((emoji,index)=>{
                   return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
                  })}
                  </div>

            </div>
            <div className='emoji-drop-down-selector-section' id="Objects">
            <h2 className='emoji-drop-down-selector-section-title'>Objects</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateObjects().map((emoji,index)=>{
                   return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
                  })}
                  </div>
            </div>
            <div className='emoji-drop-down-selector-section' id="Symbols">
             <h2 className='emoji-drop-down-selector-section-title'>Symbols</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateSymbols().map((emoji,index)=>{
                   return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
                  })}
                  </div>
            </div>
            <div className='emoji-drop-down-selector-section' id="Flags">
            <h2 className='emoji-drop-down-selector-section-title'>Flags</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateFlags().map((emoji,index)=>{
                   return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
                  })}
                  </div>
            </div>

          </div>

          <div className='emoji-drop-down-bottom'>

          </div>
    </div>
  )
}
