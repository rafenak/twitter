import React, { useRef, useState, useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

import './DiscoverySearchBar.css'
import { DiscoveryContext } from '../../context/DiscoveryContext'
import { DiscoveryContextType } from '../../context/Modal'


export const DiscoverySearchBar: React.FC = () => {

  const { updateSearchContent, searchForUsers, searchContent } = useContext(DiscoveryContext) as DiscoveryContextType;

  const [active, setActive] = useState<boolean>(false);
  const [timer, setTimer] = useState<any>();
  const inputRef = useRef<HTMLInputElement>(null)

  const handlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchContent(e.target.value);
    clearTimeout(timer)
    let t = setTimeout(
      () => searchForUsers(e.target.value),
      1000);
    setTimer(t);
  }

  const focusOnInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }

  const clearInput = () => {
    updateSearchContent('');
  }

  return (
    <div className={active ? 'discovery-search-bar-active' : "discovery-search-bar-inactive"}>
      <div className='discovery-search-bar-icon-wrapper' onClick={focusOnInput}>
        <SearchIcon sx={{
          color: `${active ? "#1DA1F2" : '#657786'}`,
          cursor: 'pointer',
        }} />
      </div>
      <input className="discovery-search-bar-input" onFocus={() => setActive(true)} onBlur={() => setActive(false)}
        onChange={handlChange} placeholder='Search' ref={inputRef} value={searchContent} />
      {searchContent &&
        <div className='discovery-search-bar-clear' onClick={clearInput}>
          <CloseIcon sx={{
            fontSize: "14px",
            width: "16px",
            height: "16px"
          }} />
        </div>
      }
    </div>
  )
}
