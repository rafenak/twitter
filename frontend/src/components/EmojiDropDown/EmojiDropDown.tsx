import React, { useEffect } from 'react'

import { generateSimleyAndPeople } from '../../utils/EmojiUtils'


export const EmojiDropDown:React.FC = () => {
    useEffect(()=>{
        generateSimleyAndPeople();
    },[])

  return (
    <div>EmojiDropDown</div>
  )
}
