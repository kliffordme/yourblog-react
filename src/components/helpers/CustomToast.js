import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './index.css'



export const CustomToast = ({title, message}) => {
  return <div>
      <div  className='toast-container'>
          <h6 className='toast-title'>{title}</h6>
      </div>
      <div className='toast-body'>
          <span>{message}</span>
      </div>
    </div>
};
