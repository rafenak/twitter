import { createElement } from 'react';
import emojis from '../data/all-emojis.json'

interface Emoji{
  images:string[];
  name:string;
  emoji:string;
  category:string;
  subcategory:string;
  modifiers:string[]
}

interface EmojiData{
  image:string;
  name:string;
  emoji:string;
  category:string;
}

interface MappedEmoji{
  emoji:string,
  image:string
}

const EMOJIS:Emoji[]= emojis.emojis;

export const EMOJIS_IMG_MAP:MappedEmoji[] = mapEmojisWithImages();

// TODO: Need to create a type
//const EMOJIS_IMG = dataWithImg.emojis; // tslint:disable-next-line:no-inferrable-types
// let supported =
//   window.navigator.platform.toUpperCase().indexOf("MAC") >= 0
//     ? "apple"
//     : "windows";

//  interface EmojiData{
//   emoji:string;
//   name:string;
//  } 



export function mapEmojisWithImages():MappedEmoji[]{
  let mappedEmojis:MappedEmoji[] = [];
  EMOJIS.forEach((emoji)=>{
    if(emoji.images.length === 1){
       mappedEmojis.push({
        emoji:emoji.emoji,
        image:emoji.images[0]
       })
    }else{
      for(let i=0; i<emoji.modifiers.length ; i++){
        mappedEmojis.push({
          emoji:emoji.modifiers[0],
          image:emoji.images[i+1]
         })
      }
    }

  })
  return mappedEmojis;
}

export const generateEmojiCategory  = (category1:string,category2:string,modifier:string):EmojiData[]=>{

  const categoryEmojis:EmojiData[]= EMOJIS.filter((emoji: Emoji) => emoji.category === category1  || emoji.category === category2)
    .map((emoji: Emoji) => {

      let indexOfModifiers = convertModifierToIndex(modifier);

      let emojiData: EmojiData = {
        name: emoji.name,
        emoji: "",
        image: "",
        category: emoji.category
      }

      if (indexOfModifiers > 0 && emoji.modifiers.length > 1) {
        emojiData = {
          ...emojiData,
          emoji: emoji.modifiers[indexOfModifiers],
          image:emoji.images[indexOfModifiers]
        }
      } else {
        emojiData = {
          ...emojiData,
          emoji: emoji.emoji,
          image:emoji.images[0]
        }
      }
      return emojiData;
    });

    return categoryEmojis;
}


export const generateTopRows = () => {
  interface TopRowData{
    img:string,
    id:string
  }
  const data: TopRowData[] = [];
  for (let emoji of EMOJIS) { 
    let images:any = emoji.images ;
    if(emoji.name === "two o’clock"){
      data[0]={
        img:images[0],
        id:"Recent"
       }
    }
    if(emoji.name === "grinning face"){
      data[1]={
        img:images[0],
        id:"Smileys & Emotion"
       }
    }

    if(emoji.name === "bear"){
      data[2]={
        img:images[0],
        id:"Animals & Nature"
       }
    }

    if(emoji.name === "hamburger"){
      data[3]={
        img:images[0],
        id:"Food & Drink"
       }
    }

    if(emoji.name === "soccer ball"){
      data[4]={
        img:images[0],
        id:"Activities"
       }
    }

    if(emoji.name === "oncoming automobile"){
      data[5]={
        img:images[0],
        id:"Activities"
       }
    }

    if(emoji.name === "light bulb"){
      data[6]={
        img:images[0],
        id:"Objects"
       }
    }

    if(emoji.name === "input symbols"){
      data[7]={
        img:images[0],
        id:"Symbols"
       }
    }

    if(emoji.name === "triangular flag"){
      data[8]={
        img:images[0],
        id:"Flags"
       }
    }
   
  }
  return data;
};


export const determineSkinToneColor = (currentSkinTone: string): string => {
  switch (currentSkinTone) {
    case "light":
      return "rgb(247,222,206)";
    case "medium-light":
      return "rgb(243,210,162)";
    case "medium":
      return "rgb(213,171,136)";
    case "medium-dark":
      return "rgb(175,126,87)";
    case "dark":
      return  "rgb(124,83,62)";
    default:
      return "rgb(255,220,93)";
  }
}


export const convertModifierToIndex = (modifier: string): number => {
  switch (modifier) {
    case "light":
      return 1;
    case "medium-light":
      return 2;
    case "medium":
      return 3; 
    case "medium-dark":
      return 4;
    case "dark":
      return 5;
    default:
      return 0;
  }
};


export const defaultImageURI = (): string => {
  return `url("data:image/png;base64,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")`;
};

export const getEmojiCharacterByNameAndModifier = (name: string, modifier: string):string  => {
  let emoji: Emoji | undefined;

  let indexOfModifiers = convertModifierToIndex(modifier) - 1;

  for (let e of EMOJIS) {
    if (e.name === name) {
      emoji = e
    }
    if (emoji) {
      if (emoji.modifiers.length === 0 || modifier === "") {
        return emoji.emoji
      } else if(indexOfModifiers === -1){
        return emoji.emoji
      }
        else {
        let indexOfModifiers = convertModifierToIndex(modifier) - 1;
        return emoji.modifiers[indexOfModifiers];
      }
    }
  }
  
  return "";
}


export const covertPostContentToParagraph = (content:string):JSX.Element=>{

  // let paragraph = document.createElement('p')
  // paragraph.setAttribute('className','feed-post-creator-post-content');

  let characters:any = Array.from(content)

  

//   for (let i = 0; i < characters.length; i++) {
    
//     if (EMOJIS_IMG_MAP.find(e=> e.emoji === characters[i])){
//       let image = EMOJIS_IMG_MAP.find(e=> e.emoji === characters[i])?.image ? EMOJIS_IMG_MAP.find(e=> e.emoji === characters[i])?.image : ""
//       console.log(image);
      
//       let spanTemplate = `<img class="feed-post-creator-post-content-emoji" 
//           src="${image}" />`
//        characters[i]=spanTemplate   
//     }
//   }

//   let updatedContent ="";

//   for(let i of characters){
//     updatedContent = updatedContent + i;
//   }

//   // let paragraph = createElement('p',{className:"feed-post-creator-post-content"},updatedContent)
//   //console.log('updatedContent',updatedContent);
  

  
//   return <p className='feed-post-creator-post-content' dangerouslySetInnerHTML={{
//     __html:updatedContent
//   }}></p>;
// }
// Map emojis to their corresponding image tags
for (let i = 0; i < characters.length; i++) {
  const currentChar = characters[i].trim().normalize();
  const emojiData = EMOJIS_IMG_MAP.find(e => e.emoji.trim().normalize() === currentChar);
  console.log(emojiData?.emoji);
  
  
  if (emojiData) {
    const image = emojiData.image || "";
    
    const spanTemplate = `<img class="feed-post-creator-post-content-emoji" src="${image}" alt="${image}"/>`;
    characters[i] = spanTemplate;
  }
}

// Join the characters array into a single string
const updatedContent = characters.join("");

// Return the updated content wrapped in a <p> tag with dangerouslySetInnerHTML
return (
  <p className="feed-post-creator-post-content" dangerouslySetInnerHTML={{ __html: updatedContent }}></p>
)
}