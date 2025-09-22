import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAPI from '../hooks/useAPI';
import Modal from '../components/Modal';
import Cart from '../pages/Cart';
import MenuItem from '@/components/List/MenuItem';


function Menu() {
  const {menu, fetchingMenu,handleRefreshOrders} = useAPI();
  const [openModal, setOpenModal] = React.useState(false);

  console.log(menu)
  const handleClose = () => {
    setOpenModal(false);
    handleRefreshOrders()
  
  };
  React.useEffect(() => {
    fetchingMenu();
  }, []);

  return (
    <>
      
      <div className='menu-container'>
        <Header handleOpenModal={()=>setOpenModal(true)} />
        <div className='menu-content'>
          <h2 className='heading'>Meny</h2>
          <ul className='list'>
            {menu
              ? menu.map((item) => (
                  <MenuItem key={item?.id} {...item} />
                ))
              : null}
          </ul>
        </div>
        <Modal open={openModal} handleClose={handleClose}>
          <Cart handleClose={handleClose} />
        </Modal>
        <Footer />
      </div>
    </>
  );
}

export default Menu;
