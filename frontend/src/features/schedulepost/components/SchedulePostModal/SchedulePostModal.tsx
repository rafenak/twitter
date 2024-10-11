import React from 'react'
import { BottomLessModal } from '../../../../components/BottomLessModal/BottomLessModal'
import { SchedulePostModalTop } from '../SchedulePostModalTop/SchedulePostModalTop'
import { SchedulePostModalContent } from '../SchedulePostModalContent/SchedulePostModalContent'

export const SchedulePostModal:React.FC = () => {
  return (
    <BottomLessModal topBar={<SchedulePostModalTop/>} content={<SchedulePostModalContent />} />
  )
}
