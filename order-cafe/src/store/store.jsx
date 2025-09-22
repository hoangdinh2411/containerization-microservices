import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import appReducer from './appSlice';
const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

const StoreProvider = ({children}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
