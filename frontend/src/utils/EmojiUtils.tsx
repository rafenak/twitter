import data from "../data/list.with.modifiers.json";

import dataWithImg from "../data/list.with.images.json";

const EMOJIS = data.emojis;

// TODO: Need to create a type
const EMOJIS_IMG = dataWithImg.emojis; // tslint:disable-next-line:no-inferrable-types

let supported =
  window.navigator.platform.toUpperCase().indexOf("MAC") >= 0
    ? "apple"
    : "windows";

 interface EmojiData{
  emoji:string;
  name:string;
 }   

export const generateSimleyAndPeople = (): EmojiData[] => {
  const simleyAndPeople = EMOJIS.filter((emoji) => {
    let supportedPlatform: any = emoji.support;
    if (
      (emoji.category === "Smileys & Emotion" ||
        emoji.category === "People & Body") &&
      supportedPlatform[supported] === true
    ) {
      return emoji;
    }
    return null;
  }).map((emoji) => {
    return {
      emoji: emoji.emoji,
      name: emoji.name,
    };
  });

  return simleyAndPeople;
};

export const generateAninamlAndNature = (): string[] => {
  const animalAndNature = EMOJIS.filter((emoji) => {
    let supportedPlatform: any = emoji.support;
    if (
      emoji.category === "Animals & Nature" &&
      supportedPlatform[supported] === true
    ) {
      return emoji;
    }
    return null;
  }).map((emoji) => emoji.emoji);

  return animalAndNature;
};

export const generateFoodAndDrink = (): string[] => {
  const foodAndDrink = EMOJIS.filter((emoji) => {
    let supportedPlatform: any = emoji.support;
    if (
      emoji.category === "Food & Drink" &&
      supportedPlatform[supported] === true
    ) {
      return emoji;
    }
    return null;
  }).map((emoji) => emoji.emoji);

  return foodAndDrink;
};

export const generateActivities = (): string[] => {
  const activities = EMOJIS.filter((emoji) => {
    let supportedPlatform: any = emoji.support;
    if (
      emoji.category === "Activities" &&
      supportedPlatform[supported] === true
    ) {
      return emoji;
    }
    return null;
  }).map((emoji) => emoji.emoji);

  return activities;
};

export const generateTravelAndPlaces = (): string[] => {
  const travelAndPlaces = EMOJIS.filter((emoji) => {
    let supportedPlatform: any = emoji.support;
    if (
      emoji.category === "Travel & Places" &&
      supportedPlatform[supported] === true
    ) {
      return emoji;
    }
    return null;
  }).map((emoji) => emoji.emoji);

  return travelAndPlaces;
};

export const generateObjects = (): string[] => {
  const objects = EMOJIS.filter((emoji) => {
    let supportedPlatform: any = emoji.support;
    if (emoji.category === "Objects" && supportedPlatform[supported] === true) {
      return emoji;
    }
    return null;
  }).map((emoji) => emoji.emoji);

  return objects;
};

export const generateSymbols = (): string[] => {
  const symbols = EMOJIS.filter((emoji) => {
    let supportedPlatform: any = emoji.support;
    if (emoji.category === "Symbols" && supportedPlatform[supported] === true) {
      return emoji;
    }
    return null;
  }).map((emoji) => emoji.emoji);

  return symbols;
};

export const generateFlags = (): string[] => {
  const flags = EMOJIS.filter((emoji) => {
    let supportedPlatform: any = emoji.support;
    if (emoji.category === "Flags" && supportedPlatform[supported] === true) {
      return emoji;
    }
    return null;
  }).map((emoji) => emoji.emoji);

  return flags;
};

export const generateTopRows = () => {
  interface TopRowData{
    img:string,
    id:string
  }
  const data: TopRowData[] = [];
  for (let emoji of EMOJIS_IMG) { 
    let images:any = emoji.images ;
    if(emoji.name === "two o’clock"){
      data[0]={
        img:images[supported],
        id:"Recent"
       }
    }
    if(emoji.name === "grinning face"){
      data[1]={
        img:images[supported],
        id:"Smileys & Emotion"
       }
    }

    if(emoji.name === "bear"){
      data[2]={
        img:images[supported],
        id:"Animals & Nature"
       }
    }

    if(emoji.name === "hamburger"){
      data[3]={
        img:images[supported],
        id:"Food & Drink"
       }
    }

    if(emoji.name === "soccer ball"){
      data[4]={
        img:images[supported],
        id:"Activities"
       }
    }

    if(emoji.name === "oncoming automobile"){
      data[5]={
        img:images[supported],
        id:"Activities"
       }
    }

    if(emoji.name === "light bulb"){
      data[6]={
        img:images[supported],
        id:"Objects"
       }
    }

    if(emoji.name === "input symbols"){
      data[7]={
        img:images[supported],
        id:"Symbols"
       }
    }

    if(emoji.name === "triangular flag"){
      data[8]={
        img:images[supported],
        id:"Flags"
       }
    }
    // if (
    //   emoji.name === "two o’clock" ||
    //   emoji.name === "grinning face" ||
    //   emoji.name === "bear" ||
    //   emoji.name === "hamburger" ||
    //   emoji.name === "soccer ball" ||
    //   emoji.name === "oncoming automobile" ||
    //   emoji.name === "light bulb" ||
    //   emoji.name === "input symbols" ||
    //   emoji.name === "triangular flag"
    // ){
    //   images = emoji.images;
    // imgs.push(images[supported]);
    // }
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
