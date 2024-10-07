import React,{useState} from 'react'
import { ValidatedTextInput } from '../../../../components/ValidatedInput/ValidatedTextInput';
import AddIcon from '@mui/icons-material/Add'
import { ValidatedDateSelector } from '../../../../components/ValidatedInput/ValidatedDateSelector';

import './FeedPostCreatorPoll.css'
import { generatePollDaysSelection, generatePollHoursSelection, generatePollMinutesSelection } from '../../utils/FeedUtils';
import { AppDisptach } from '../../../../redux/Store';
import { useDispatch } from 'react-redux';
import { removePoll, setPollData, updatePoll } from '../../../../redux/Slices/PostSlice';

export const FeedPostCreatorPoll:React.FC = () => {

    const dispatch:AppDisptach = useDispatch()
    const [labels,setLabels] = useState<string[]>(['Choice 1','Choice 2'])
    const [time,setTime]= useState<{days:string,hours:string,minutes:string}>({
        days:"1",
        hours:"0",
        minutes:"0"
    });

    const addNewChoice  = () =>{ 
        if(labels.length < 4){
            setLabels([...labels, `Choice ${labels.length+1} (optional)`]);
        }
    }

    const updateChoiceText = (e:React.ChangeEvent<HTMLInputElement> ) =>{
        //choice:${index}
        const index=e.target.name.split(":")[1];
        dispatch(updatePoll({
            index:+index, 
            choiceText:e.target.value,
        }))
    }

    const updateTime = (name:string,value:string | number  | boolean) =>{
        setTime({
            ...time,
            [name]:value
        })
        let date = JSON.parse(JSON.stringify(time))
        date={
            ...date,
            [name]:value
        }
        dispatch(setPollData(`${date.days}:${date.hours}:${date.minutes}`))
    } 
 
    const deletePoll = () =>{
        dispatch(removePoll())
    }

  return (
    <div className='feed-post-creator-poll' style={{zIndex:5}}>
        <div className='feed-post-creator-poll-choices'> 
            {  labels.map((label,index) => {
                return(
                    <div className='feed-post-creator-poll-choice' key={label} id={label}>
                        <div className={labels.length < 4 ? 'feed-post-creator-poll-choice-wrapper-min' : 'feed-post-creator-poll-choice-wrapper-max'}>
                            <ValidatedTextInput valid={true} name={`choice:${index}`} label={label} changeValue={updateChoiceText}
                                attributes={{maxLength:25}}/>
                        </div>
                            { 
                                index === labels.length - 1 && labels.length < 4 &&
                                <div className='feed-post-creator-poll-choice-add'>
                                    <div className='feed-post-creator-poll-choice-add-hover' onClick={addNewChoice}>
                                         <AddIcon sx={{
                                                color:'rgb(29, 161,  242)'
                                         }}/>
                                    </div> 
                                </div>
                            }
                    </div>
                )
            })
            }
        </div> 
        <div className='feed-post-creator-poll-length'>
            <p className='feed-post-creator-poll-length-text'>
                Poll Length
            </p>
            <div className='feed-post-creator-poll-length-wrapper'>
            <ValidatedDateSelector style='' valid={true}  name={"Days"} dropDown={generatePollDaysSelection} dispatcher={updateTime} data={+time.days}/>
            <ValidatedDateSelector style='' valid={true}  name={"Hours"} dropDown={generatePollHoursSelection} dispatcher={updateTime} data={+time.hours}/>
            <ValidatedDateSelector style='' valid={true}  name={"Minutes"} dropDown={generatePollMinutesSelection} dispatcher={updateTime} data={+time.minutes}/>
            </div> 
        </div>
        <div className='feed-post-creator-poll-button' onClick={deletePoll}>
            Remove Poll
        </div>
    </div>
  )
} 
