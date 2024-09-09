import React from 'react'
import { Modal } from '../../../../components/modal/Modal'
import { ForgotModalTop } from '../ForgotModalTop/ForgotModalTop'

export const ForgotPasswordModal:React.FC<{toggleModal:()=>void}> = ({toggleModal}) => {
  return (
    <div>
        <Modal topContent={<ForgotModalTop closeModal={toggleModal} />}
        content={<>content</>}
        bottomContent={<>bottom</>}
        />
    </div>
  )
}

