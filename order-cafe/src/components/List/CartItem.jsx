import React from 'react';
import arrowDown from '../../assets/graphics/arrow-down.svg';
import arrowUp from '../../assets/graphics/arrow-up.svg';
import useAPI from '../../hooks/useAPI';

function CartItem(props) {
  console.log('item');
  const {handleChangeAmount} = useAPI();

  const {id, title, price, amount} = props;

  const handleClickArrow = (id, number) => {
    handleChangeAmount(id, number);
  };
  return (
    <div className='menu-item'>
      <div className='info'>
        <p className='main-text'>{title} </p>
        <p className='sub-text'>{price} kr </p>
      </div>
      <div className='change-amount'>
        <button
          type='button'
          className='arrowImage'
          onClick={() => handleClickArrow(id, +1)}
        >
          <img src={arrowUp} alt='up' />
        </button>
        <p className='number'>{amount }</p>
        <button
          type='button'
          className='arrowImage'
          disabled={amount === 0 ? true : false}
          onClick={() => handleClickArrow(id, -1)}
        >
          <img src={arrowDown} alt='down' />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
