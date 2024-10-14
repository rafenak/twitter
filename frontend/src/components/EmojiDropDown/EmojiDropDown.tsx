import React, { useEffect, useState } from 'react'

import {
  determineSkinToneColor,
  generateActivities, generateAninamlAndNature, generateFlags,
  generateFoodAndDrink, generateObjects, generateSimleyAndPeople, generateSymbols,
  generateTopRows, generateTravelAndPlaces
} from '../../utils/EmojiUtils'
import './EmojiDropDown.css'
import SearchIcon from '@mui/icons-material/Search'
import DoneIcon from '@mui/icons-material/Done'


export const EmojiDropDown: React.FC = () => {

  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [currentEmoji, setCurrentEmoji] = useState<string>("😂");
  const [skinToneSelectorActive, setSkinToneSelectionActive] = useState<boolean>(false);
  const [currentSkinTone, setCurrentSkinTone] = useState<string>("none")



  const navigateToEmojiCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    switch (e.currentTarget.id) {

      case "0":
        setActiveCategory(0);
        let recent = document.getElementById("Recent")
        if (recent) recent.scrollIntoView({ behavior: "smooth", block: "start" });
        break;

      case "1":
        setActiveCategory(1);
        let simleys = document.getElementById("Smileys & Emotion")
        if (simleys) simleys.scrollIntoView({ behavior: "smooth", block: "start" });
        break;

      case "2":
        setActiveCategory(2);
        let animals = document.getElementById("Animals & Nature")
        if (animals) animals.scrollIntoView({ behavior: "smooth", block: "start" });
        break;

      case "3":
        setActiveCategory(3);
        let food = document.getElementById("Food & Drink")
        if (food) food.scrollIntoView({ behavior: "smooth", block: "start" });
        break;

      case "4":
        setActiveCategory(4);
        let act = document.getElementById("Activities")
        if (act) act.scrollIntoView({ behavior: "smooth", block: "start" });
        break;

      case "5":
        setActiveCategory(5);
        let travel = document.getElementById("Travel & Places")
        if (travel) travel.scrollIntoView({ behavior: "smooth", block: "start" });
        break;

      case "6":
        setActiveCategory(6);
        let objects = document.getElementById("Objects")
        if (objects) objects.scrollIntoView({ behavior: "smooth", block: "start" });
        break;

      case "7":
        setActiveCategory(7);
        let symbols = document.getElementById("Symbols")
        if (symbols) symbols.scrollIntoView({ behavior: "smooth", block: "start" });
        break;

      case "8":
        setActiveCategory(8);
        let flags = document.getElementById("Flags")
        if (flags) flags.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
    }
  };

  const getCurrentEmoji = (e: React.MouseEvent<HTMLDivElement>) => {
    const element: any = e.target;
    if (element.id) {
      setCurrentEmoji(element.innerText);
    }
    console.log(currentEmoji);

  }

  const resetCurrentEmoji = (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentEmoji("😂")
  }

  const selectSkinTone = (e: React.MouseEvent<HTMLDivElement>) =>{
    setCurrentSkinTone(e.currentTarget.id);
    setSkinToneSelectionActive(false);

  }


  return (
    <div className='emoji-drop-down'>
      <div className='emoji-drop-down-top'>
        <div className='emoji-drop-down-search-border'>
          <SearchIcon sx={{
            fontSize: "18px",
            position: "absolute",
            top: "24px",
            left: "16px"
          }} />
          <input className='emoji-drop-down-search' type='' id='emoji-search' placeholder='Search' onChange={() => { }} />
        </div>
        <div className='emoji-drop-down-categories'>
          {generateTopRows().map((data, index) => {
            if (activeCategory === index) {
              return <div className='emoji-drop-down-category-wrapper'>
                <div key={index} id={`${index}`} className='emoji-drop-down-category emoji-active' style={{
                  backgroundImage: `url("${data.img}")`,
                }}> </div>
                <div className='emoji-drop-down-category-underline-active'></div>
              </div>

            } else {
              return <div className='emoji-drop-down-category-wrapper'>
                <div key={index} id={`${index}`} className='emoji-drop-down-category emoji-inactive' style={{
                  backgroundImage: `url("${data.img}")`,
                }} onClick={navigateToEmojiCategory}> </div>
                <div className='emoji-drop-down-category-underline-inactive'></div>
              </div>
            }
          }
          )}
        </div>
      </div>
      <div className='emoji-drop-down-selector' onMouseOver={getCurrentEmoji} onMouseLeave={resetCurrentEmoji}>
        <div className='emoji-drop-down-selector-section' id="Smileys & Emotion">
          <h2 className='emoji-drop-down-selector-section-title'>Smileys & Emotion</h2>
          <div className='emoji-drop-down-selector-section-wrapper'>
            {generateSimleyAndPeople().map((emoji, index) => {
              return <div key={index} aria-label={emoji.name} id={emoji.name} className='emoji-drop-down-emoji'>{emoji.emoji}</div>
            })}
          </div>
        </div>
        <div className='emoji-drop-down-selector-section' id="Animals & Nature">
          <h2 className='emoji-drop-down-selector-section-title'>Animals & Nature</h2>
          <div className='emoji-drop-down-selector-section-wrapper'>
            {generateAninamlAndNature().map((emoji, index) => {
              return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
            })}
          </div>
        </div>
        <div className='emoji-drop-down-selector-section' id="Food & Drink">
          <h2 className='emoji-drop-down-selector-section-title'>Food & Drink</h2>
          <div className='emoji-drop-down-selector-section-wrapper'>
            {generateFoodAndDrink().map((emoji, index) => {
              return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
            })}
          </div>
        </div>
        <div className='emoji-drop-down-selector-section' id="Activities">
          <h2 className='emoji-drop-down-selector-section-title'>Activities</h2>
          <div className='emoji-drop-down-selector-section-wrapper'>
            {generateActivities().map((emoji, index) => {
              return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
            })}
          </div>
        </div>
        <div className='emoji-drop-down-selector-section' id="Travel & Places">
          <h2 className='emoji-drop-down-selector-section-title'>Travel & Places</h2>
          <div className='emoji-drop-down-selector-section-wrapper'>
            {generateTravelAndPlaces().map((emoji, index) => {
              return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
            })}
          </div>

        </div>
        <div className='emoji-drop-down-selector-section' id="Objects">
          <h2 className='emoji-drop-down-selector-section-title'>Objects</h2>
          <div className='emoji-drop-down-selector-section-wrapper'>
            {generateObjects().map((emoji, index) => {
              return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
            })}
          </div>
        </div>
        <div className='emoji-drop-down-selector-section' id="Symbols">
          <h2 className='emoji-drop-down-selector-section-title'>Symbols</h2>
          <div className='emoji-drop-down-selector-section-wrapper'>
            {generateSymbols().map((emoji, index) => {
              return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
            })}
          </div>
        </div>
        <div className='emoji-drop-down-selector-section' id="Flags">
          <h2 className='emoji-drop-down-selector-section-title'>Flags</h2>
          <div className='emoji-drop-down-selector-section-wrapper'>
            {generateFlags().map((emoji, index) => {
              return <div key={index} className='emoji-drop-down-emoji'>{emoji}</div>
            })}
          </div>
        </div>

      </div>

      <div className='emoji-drop-down-bottom'>
        <div className='emoji-drop-down-bottom-current-emoji'>{currentEmoji}</div>
        <div className='emoji-drop-down-bottom-skin-tone-selector'>
          {
            skinToneSelectorActive ?
              <div className='emoji-drop-down-bottom-skin-tone-selector-wrapper'>
                <div className='emoji-drop-down-bottom-skin-tone-option' id="none" onClick={selectSkinTone}> </div>
                <div className='emoji-drop-down-bottom-skin-tone-option' id="light" onClick={selectSkinTone}> </div>
                <div className='emoji-drop-down-bottom-skin-tone-option' id="medium-light" onClick={selectSkinTone}> </div>
                <div className='emoji-drop-down-bottom-skin-tone-option' id="medium" onClick={selectSkinTone}> </div>
                <div className='emoji-drop-down-bottom-skin-tone-option' id="medium-dark" onClick={selectSkinTone}> </div>
                <div className='emoji-drop-down-bottom-skin-tone-option' id="dark" onClick={selectSkinTone}> </div>
              </div>
              :
              <div className='emoji-drop-down-bottom-skin-tone-selector-wrapper'>
                <div className='emoji-drop-down-bottom-skin-tone-selected' style={{
                  backgroundColor: `${determineSkinToneColor(currentSkinTone)}`
                }} onClick={()=> setSkinToneSelectionActive(true)}>
                   <DoneIcon sx={{
                    fontSize: "12px"
                   }}/>
                </div>
              </div>
          }
        </div>
      </div>
    </div> 
  )
}
