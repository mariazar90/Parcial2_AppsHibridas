
import PropTypes from 'prop-types'

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './ModalComponent.css'
import { useEffect, useState } from "react"

function ModalComponent({show, children, closeModal}){

   return (
    <>
      {show ?
      (
        <div className="modal">
          <div className="modal-card">
            <IconButton aria-label="close" size="small" color="error" onClick={closeModal}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
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