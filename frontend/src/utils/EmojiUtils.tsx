import data from "../data/list.json";

import dataWithImg from "../data/list.with.images.json";

const EMOJIS = data.emojis;

// TODO: Need to create a type
const EMOJIS_IMG = dataWithImg.emojis; // tslint:disable-next-line:no-inferrable-types

let supported =
  window.navigator.platform.toUpperCase().indexOf("MAC") >= 0
    ? "apple"
    : "windows";

export const generateSimleyAndPeople = (): string[] => {
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
  }).map((emoji) => emoji.emoji);

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
  const imgs: string[] = [];
  for (let emoji of EMOJIS_IMG) {
    let images:any = emoji.images ;
    if(emoji.name === "two o’clock"){
        imgs[0]= images[supported] 
    }
    if(emoji.name === "grinning face"){
        imgs[1]= images[supported] 
    }

    if(emoji.name === "bear"){
        imgs[2]= images[supported] 
    }

    if(emoji.name === "hamburger"){
        imgs[3]= images[supported] 
    }

    if(emoji.name === "soccer ball"){
        imgs[4]= images[supported] 
    }

    if(emoji.name === "oncoming automobile"){
        imgs[5]= images[supported] 
    }

    if(emoji.name === "light bulb"){
        imgs[6]= images[supported] 
    }

    if(emoji.name === "input symbols"){
        imgs[7]= images[supported] 
    }

    if(emoji.name === "triangular flag"){
        imgs[8]= images[supported] 
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
  return imgs;
};
