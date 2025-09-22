import React from 'react';
import CartItem from '../components/List/CartItem';
import useAPI from '../hooks/useAPI';

function Cart({handleClose}) {
  const {orders, totalProduct ,handleCompleteOrder} = useAPI();
  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    const totalPrice = orders.reduce((prev, current) => {
      if (current.amount <= 0) {
        return prev + 0;
      }
      return prev + current.price * current.amount;
    }, 0);
    setTotal(totalPrice);
  }, [orders]);
  return (
    <div className='cart'>
      <span className='close' onClick={handleClose}>
        X
      </span>
      <h2 className='order-heading'>Din beställning</h2>
      <div className='order-list__container'>
        <ul className='order-list'>
          {orders.map((item) => (
            <CartItem key={item?.id} {...item} />
          ))}
        </ul>
        <div className='total'>
          <div className='info'>
            <p className='main-text'>Total </p>
            <p className='sub-text'>
              inkl moms + drönarleverans{' '}
            </p>
          </div>
          <span className='price'>{total} kr</span>
        </div>
      </div>
      <button

        type='button'
        className='btn pay-btn'
        disabled={totalProduct ===0 ? true : false}
        onClick={handleCompleteOrder}
      >
        Take my money!
      </button>
    </div>
  );
}

export default Cart;
