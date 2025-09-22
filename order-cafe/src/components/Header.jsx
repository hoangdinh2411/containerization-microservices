import React from 'react';
import bag from '../assets/graphics/bag.svg';
import useAPI from '@/hooks/useAPI';

function Header({handleOpenModal}) {
  const {totalProduct} = useAPI();
  
  return (
    <div className='graphics header '>
      <div
        className='bag'
        onClick={handleOpenModal}
      >
        
        <p className='count'>{totalProduct}</p>
        <img className='bag-image' src={bag} />
      </div>
    </div>
  );
}

export default Header;
