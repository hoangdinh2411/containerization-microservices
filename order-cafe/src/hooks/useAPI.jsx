import React from "react";
import { SET_MENU, SET_ORDERS } from "../store/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function useAPI() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.app.menu);
  const orders = useSelector((state) => state.app.orders.list);
  const totalProduct = useSelector((state) => state.app.orders.totalProduct);
  const API_URL = import.meta.env.VITE_API_URL;
  console.log(API_URL)
  const fetchingMenu = async () => {
    await fetch(API_URL + "/api/menu", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(SET_MENU(data.menu));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOrderCafe = async (produceId) => {
    // find product on orders if the product was selected 1 time before
    const orderedProduct = orders.find((order) => order.id === produceId);
    let newOrder = orders.slice(0, orders.length);

    // if product was selected,
    if (orderedProduct) {
      // plus 1 on amount property on current list
      newOrder = orders.map((order) => {
        if (order.id === produceId) {
          return { ...order, amount: order.amount + 1 };
        }
        return order;
      });
    } else {
      // if product wasn't selected , find product on menu
      const selectedProduct = menu.find((item) => item.id === produceId);

      // create a new list , that include other old selected product , add amount property for new product
      newOrder.unshift({
        ...selectedProduct,
        amount: 1,
      });
    }
    const total = totalProduct + 1;

    dispatch(SET_ORDERS({ list: newOrder, total }));
    return;
  };

  const handleChangeAmount = (productId, number) => {
    const newOrders = orders.map((order) => {
      if (order.id === productId) {
        return {
          ...order,
          amount: order.amount + number,
        };
      }

      return order;
    });
    const total = totalProduct + number;
    dispatch(SET_ORDERS({ list: newOrders, total }));
    return;
  };

  const handleRefreshOrders = () => {
    const newOrders = orders.filter((order) => order.amount > 0);
    dispatch(SET_ORDERS({ list: newOrders, total: totalProduct }));
    return;
  };

  const handleCompleteOrder = async () => {
    await fetch(API_URL + "/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orders),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(SET_ORDERS({ list: [], total: 0 }));
          navigate("/status", { state: data.order });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleResetStates = () => {
    return;
  };

  return {
    menu,
    totalProduct,
    orders,
    fetchingMenu,
    handleOrderCafe,
    handleChangeAmount,
    handleRefreshOrders,
    handleCompleteOrder,
  };
}

export default useAPI;
