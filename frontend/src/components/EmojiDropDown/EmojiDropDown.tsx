import React, { useEffect, useState } from 'react'

import {
  defaultImageURI,
  determineSkinToneColor, EmojiData, generateEmojiCategory,
  generateTopRows,
  getEmojiCharacterByNameAndModifier, Emoji,
  convertModifierToIndex,
  EMOJIS
  // generateActivities, generateAninamlAndNature, generateFlags,
  // generateFoodAndDrink, generateObjects, generateSymbols,
  // generateTopRows, generateTravelAndPlaces
} from '../../utils/EmojiUtils'
import './EmojiDropDown.css'
import SearchIcon from '@mui/icons-material/Search'
import DoneIcon from '@mui/icons-material/Done'
import { AppDisptach, RootState } from '../../redux/Store'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentPost } from '../../redux/Slices/PostSlice'
import ClosedRoundedIcon from '@mui/icons-material/CloseRounded'
import { useLocalStorage } from '../../hooks/useLocalStorage'


export const EmojiDropDown: React.FC = () => {


  let currentPost = useSelector((state: RootState) => state.post.currentPost)
  let currentReply = useSelector((state: RootState) => state.post.currentReply)
  const dispatch: AppDisptach = useDispatch()

  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [currentEmoji, setCurrentEmoji] = useState<string>(defaultImageURI());
  const [currentEmojiName, setCurrentEmojiName] = useState<string>("face with tears of joy")
  const [skinToneSelectorActive, setSkinToneSelectionActive] = useState<boolean>(false);
  const [currentSkinTone, setCurrentSkinTone] = useState<string>("none")
  const [emojiSearchContent, setEmojiSearchContent] = useState<string>("")
  const [searchEmojis, setSearchEmojis] = useState<EmojiData[]>([])
  const [recentEmojis, setRecentEmojis, removeRecentEmojis] = useLocalStorage("recentEmojis", "");

  // let options = {
  //   root: document.querySelector("#emoji-scroll-area"),
  //   rootMargin: "0px",
  //   threshold: 0
  // }

  // let debouncedCalculateCategory = debounce(calculateCategory, 50);
  // let observer = new IntersectionObserver(debouncedCalculateCategory, options);
  // //let observer = new IntersectionObserver(calculateCategory, options);
  // let header = document.querySelectorAll(".emoji-drop-down-selector-section-title")
  // let recentHeader = document.querySelectorAll(".emoji-drop-down-selector-recent-title")
  // header.forEach((elem) => {
  //   if (elem !== null) {
  //     observer.observe(elem)
  //   }
  // })
  // if (recentHeader.length > 0) {
  //   recentHeader.forEach((header) => observer.observe(header));
  // }

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

  function calculateCategory(entries: any, observer: any) {
    let intersecting: boolean[] = []
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        let id = elem.id
        if (id === "recentHeader") {
          intersecting[0] = true;
        }
        if (id === "smileysAndEmotionHeader") {
          intersecting[1] = true;
        }
        if (id === "animalsAndNatureHeader") {
          intersecting[2] = true;
        }
        if (id === "foodAndDrinkHeader") {
          intersecting[3] = true;
        }
        if (id === "activitiesHeader") {
          intersecting[4] = true;
        }
        if (id === "travelAndPlacesHeader") {
          intersecting[5] = true;
        }
        if (id === "objectsHeader") {
          intersecting[6] = true;
        }
        if (id === "symbolsHeader") {
          intersecting[7] = true;
        }
        if (id === "flagsHeader") {
          intersecting[8] = true;
        }

      }
    });

    let findFirstTrue = (): number => {
      for (let i = 0; i < intersecting.length; i++) {
        if (intersecting[i] === true) {
          return i;
        }
      }
      return 0;
    }

    setActiveCategory(findFirstTrue)

  }




  const getCurrentEmoji = (e: React.MouseEvent<HTMLDivElement>) => {
    const element: any = e.target;
    if (element.id) {
      setCurrentEmoji(element.style.backgroundImage);
      setCurrentEmojiName(element.id);
    }
  }

  const resetCurrentEmoji = (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentEmoji(defaultImageURI())
    setCurrentEmojiName("face with tears of joy");
  }

  const selectSkinTone = (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentSkinTone(e.currentTarget.id);
    setSkinToneSelectionActive(false);

  }

  function debounce(fn: Function, delay: number) {
    let timeoutId: number;
    return function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => fn(...args), delay);
    };
  }

  const appendEmojiToPost = (e: React.MouseEvent<HTMLDivElement>) => {
    let name = e.currentTarget.id;
    let emoji = getEmojiCharacterByNameAndModifier(name, currentSkinTone);
    emoji = emoji.replace(/\u200d/g, '');
    emoji = emoji.replace(/♂️|♀️/g, '');

    if (currentPost) {
      let postContent = currentPost.content || '';
      let newContent = postContent + emoji;
      dispatch(updateCurrentPost({
        name: "content",
        value: newContent
      }));
    }

    if (currentReply) {
      let postContent = currentReply.replyContent || '';
      let newContent = postContent + emoji;
      dispatch(updateCurrentPost({
        name: "replyContent",
        value: newContent
      }));
    }

    let emojis: EmojiData[] = JSON.parse(recentEmojis);
    let emojiData = EMOJIS.find(e => e.name === name)
    if (!emojis.find(e => e.name === name)) {
      emojis.unshift({
        name: name,
        category: emojiData?.category || '',
        emoji: emoji,
        image: emojiData?.images[convertModifierToIndex(currentSkinTone)] || ''
      })
    } else {
      for (let i = 0; i < emojis.length; i++) {
        if (emojis[i].name === name) {
          emojis.splice(i, 1);
        }
      }
      emojis.unshift({
        name: name,
        category: emojiData?.category || '',
        emoji: emoji,
        image: emojiData?.images[convertModifierToIndex(currentSkinTone)] || ''
      })
    }
    setRecentEmojis(JSON.stringify(emojis.slice(0, 9)))
  }

  const updateEmojiSerachContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmojiSearchContent(e.target.value)

    setSearchEmojis(() => {
      return EMOJIS.filter((emoji: Emoji) => emoji.name.toLowerCase().includes(e.target.value.toLowerCase())).map((emoji) => {
        return {
          image: emoji.images[convertModifierToIndex(currentSkinTone)],
          name: emoji.name,
          emoji: emoji.emoji,
          category: emoji.category
        }
      })
    })
  }

  useEffect(() => {

    if (!recentEmojis) {
      setRecentEmojis(JSON.stringify([]));
    }

  }, [searchEmojis.length])

  return (
    <div className='emoji-drop-down' onClick={(e)=> e.stopPropagation()}>
      <div className='emoji-drop-down-top'>
        <div className='emoji-drop-down-search-border'>
          <SearchIcon sx={{
            fontSize: "18px", 
            position: "absolute",
            top: "24px",
            left: "16px"
          }} />
          <input className='emoji-drop-down-search' type='' id='emoji-search' placeholder='Search emojis' onChange={updateEmojiSerachContent} value={emojiSearchContent} />
          {emojiSearchContent ? <div className='emoji-drop-down-search-clear' onClick={() => setEmojiSearchContent("")}>
            <ClosedRoundedIcon sx={{
              fontSize: "12px",
              color: "white",
              fontWeight: "600",
              height: '12px',
              width: '12px',

            }} />
          </div> : <></>
          }
        </div>
        <>
          {!emojiSearchContent ?
            <div className='emoji-drop-down-categories'>
              {generateTopRows().map((data, index) => {
                if (activeCategory === index) {
                  return <div key={index} className='emoji-drop-down-category-wrapper'>
                    <div key={index} id={`${index}`} className='emoji-drop-down-category emoji-active' style={{
                      backgroundImage: `url("${data.img}")`,
                    }}> </div>
                    <div className='emoji-drop-down-category-underline-active'></div>
                  </div>

                } else {
                  return <div key={index} className='emoji-drop-down-category-wrapper'>
                    <div key={index} id={`${index}`} className='emoji-drop-down-category emoji-inactive' style={{
                      backgroundImage: `url("${data.img}")`,
                    }} onClick={navigateToEmojiCategory}> </div>
                    <div className='emoji-drop-down-category-underline-inactive'></div>
                  </div>
                }
              }
              )}
            </div> :
            <div className='emoji-drop-down-categories'>
              {generateTopRows().map((data, index) => {
                return <div key={index} className='emoji-drop-down-category-wrapper'>
                  <div key={index} id={`${index}`} className='emoji-drop-down-category emoji-inactive-search' style={{
                    backgroundImage: `url("${data.img}")`,
                  }} onClick={navigateToEmojiCategory}> </div>
                  <div className='emoji-drop-down-category-underline-inactive'></div>
                </div>
              }
              )}
            </div>
          }
        </>
      </div>
      <div className='emoji-drop-down-selector' onMouseOver={!emojiSearchContent ? getCurrentEmoji : () => { }}
        onMouseLeave={!emojiSearchContent ? resetCurrentEmoji : () => { }} id="emoji-scroll-area">
        {
          !emojiSearchContent &&  recentEmojis ?
            <>
              { JSON.parse(recentEmojis).length > 0 ? 
                <div className='emoji-drop-down-selector-section' id="Recent">
                <div className='emoji-drop-down-selector-recent-section'>
                  <h2 className='emoji-drop-down-selector-recent-title' id="recentHeader">Recent</h2>
                  <h3 className='emoji-drop-down-selector-clear-recent' onClick={() => setRecentEmojis(JSON.stringify([]))}>
                    Clear All
                  </h3>
                </div>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {JSON.parse(recentEmojis).map((emoji: EmojiData, index: number) => {
                    return <div key={index} onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className='emoji-drop-down-emoji'
                      style={{ backgroundImage: `url("${emoji.image}")` }}></div>
                  })}
                </div>
              </div>  : <></>
              }
              <div className='emoji-drop-down-selector-section' id="Smileys & Emotion">
                <h2 className='emoji-drop-down-selector-section-title' id="smileysAndEmotionHeader">Smileys & Emotion</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateEmojiCategory("Smileys & Emotion", "People & Body", currentSkinTone).map((emoji, index) => {
                    return <div key={index} onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className='emoji-drop-down-emoji'
                      style={{ backgroundImage: `url("${emoji.image}")` }}></div>
                  })}
                </div>
              </div>
              <div className='emoji-drop-down-selector-section' id="Animals & Nature">
                <h2 className='emoji-drop-down-selector-section-title' id="animalsAndNatureHeader">Animals & Nature</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateEmojiCategory("Animals & Nature", "", currentSkinTone).map((emoji, index) => {
                    return <div key={index} onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className='emoji-drop-down-emoji'
                      style={{ backgroundImage: `url("${emoji.image}")` }}></div>
                  })}
                </div>
              </div>
              <div className='emoji-drop-down-selector-section' id="Food & Drink">
                <h2 className='emoji-drop-down-selector-section-title' id="foodAndDrinkHeader">Food & Drink</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateEmojiCategory("Food & Drink", "", currentSkinTone).map((emoji, index) => {
                    return <div key={index} onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className='emoji-drop-down-emoji'
                      style={{ backgroundImage: `url("${emoji.image}")` }}></div>
                  })}
                </div>
              </div>
              <div className='emoji-drop-down-selector-section' id="Activities">
                <h2 className='emoji-drop-down-selector-section-title' id="activitiesHeader">Activities</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateEmojiCategory("Activities", "", currentSkinTone).map((emoji, index) => {
                    return <div key={index} onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className='emoji-drop-down-emoji'
                      style={{ backgroundImage: `url("${emoji.image}")` }}></div>
                  })}
                </div>
              </div>
              <div className='emoji-drop-down-selector-section' id="Travel & Places">
                <h2 className='emoji-drop-down-selector-section-title' id='travelAndPlacesHeader'>Travel & Places</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateEmojiCategory("Travel & Places", "", currentSkinTone).map((emoji, index) => {
                    return <div key={index} onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className='emoji-drop-down-emoji'
                      style={{ backgroundImage: `url("${emoji.image}")` }}></div>
                  })}
                </div>

              </div>
              <div className='emoji-drop-down-selector-section' id="Objects">
                <h2 className='emoji-drop-down-selector-section-title' id='objectsHeader'>Objects</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateEmojiCategory("Travel & Places", "", currentSkinTone).map((emoji, index) => {
                    return <div key={index} onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className='emoji-drop-down-emoji'
                      style={{ backgroundImage: `url("${emoji.image}")` }}></div>
                  })}
                </div>
              </div>
              <div className='emoji-drop-down-selector-section' id="Symbols">
                <h2 className='emoji-drop-down-selector-section-title' id="symbolsHeader">Symbols</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateEmojiCategory("Symbols", "", currentSkinTone).map((emoji, index) => {
                    return <div key={index} onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className='emoji-drop-down-emoji'
                      style={{ backgroundImage: `url("${emoji.image}")` }}></div>
                  })}
                </div>
              </div>
              <div className='emoji-drop-down-selector-section' id="Flags">
                <h2 className='emoji-drop-down-selector-section-title' id="flagsHeader">Flags</h2>
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {generateEmojiCategory("Flags", "", currentSkinTone).map((emoji, index) => {
                    return <div key={index} onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className='emoji-drop-down-emoji'
                      style={{ backgroundImage: `url("${emoji.image}")` }}></div>
                  })}
                </div>
              </div>
            </>
            :
            <div className='emoji-drop-down-selector-section' id="Search">
              <h2 className='emoji-drop-down-selector-section-title'>Search</h2>
              {searchEmojis.length > 1 ?
                <div className='emoji-drop-down-selector-section-wrapper'>
                  {searchEmojis.map((emoji, index) => {
                    return <div key={index} onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className='emoji-drop-down-emoji'
                      style={{ backgroundImage: `url("${emoji.image}")` }}></div>
                  })}
                </div>
                : <div className='emoji-drop-down-selector-section-no-results'>
                  <h2 className='emoji-drop-down-selector-section-no-results-header'>No Emoji Found</h2>
                  <p className='emoji-drop-down-selector-section-no-results-message'>Try searching for something else instead.</p>
                </div>
              }
            </div>
        }
      </div>

      <div className='emoji-drop-down-bottom'>
        <div className='emoji-drop-down-bottom-current-emoji' style={{
          backgroundImage: `${currentEmoji}`
        }}></div>
        <div className='emoji-drop-down-bottom-current-emoji-name'>{currentEmojiName}</div>
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
                }} onClick={() => setSkinToneSelectionActive(true)}>
                  <DoneIcon sx={{
                    fontSize: "12px"
                  }} />
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  )
}
