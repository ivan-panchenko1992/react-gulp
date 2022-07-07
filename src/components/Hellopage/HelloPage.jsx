import React from 'react';
import Image from '../../../images/hello-world.jpg'

export const HelloPage = () => {
  return (
    <div className='hello-container'>
      <img style={{width: 300, height: 150}} src={Image}/>
      Hello Ivan!!
      <br/>
      We made it
    </div>
  )
}
