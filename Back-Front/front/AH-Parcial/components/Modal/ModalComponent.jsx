
import PropTypes from 'prop-types'
import './ModalComponent.css'
import { useEffect, useState } from "react"

function ModalComponent({show, children, closeModal}){

   return (
    <>
      {show ?
      (
        <div className="modal">
          <div className="modal-card">
            <div className="modal-card-header"><button onClick={closeModal}>x</button></div>
            {children}
          </div>
        </div>
      ) : <></>
      }
    </>
   )
}

ModalComponent.prototype = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default ModalComponent