import React from 'react';
import addButton from '../../assets/graphics/add.svg';
import useAPI from '../../hooks/useAPI';
function MenuItem(props) {
  const {id, title, desc, price} = props;
  const {handleOrderCafe} = useAPI();

  const handleAddProductOnOrder = (e, id) => {
    e.preventDefault();
    handleOrderCafe(id);
  };
  return (
    <div className='menu-item'>
      <span
        className='add-btn'
        onClick={(e) => handleAddProductOnOrder(e, id)}
      >
        <img src={addButton} alt='add' />
      </span>
      <div className='info'>
        <p className='main-text'>{title} </p>
        <p className='sub-text'>{desc} </p>
      </div>
      <span className='price'>{price} kr</span>
    </div>
  );
}

export default MenuItem;
