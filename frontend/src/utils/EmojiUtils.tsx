
import data from '../data/list.json';

const EMOJI= data.emojis

export const generateSimleyAndPeople = ():string[]=>{
    let supported= window.navigator.platform.toUpperCase().indexOf("MAC") >=0 ? 'apple':'windows';

    let obj:any={
        name:"bob"
    }

    let name = obj['name']

    const simleyAndPeople=EMOJI
    .filter(emoji=> 
        (emoji.category=== "Smileys & Emotion" || emoji.category=== "People & Body") && emoji)
    .map(emoji => emoji.emoji);
    console.log(simleyAndPeople);
    return simleyAndPeople;
}