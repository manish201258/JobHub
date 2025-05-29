import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import store from './redux/store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
const persistor=persistStore(store);


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer />
        </PersistGate>
    </Provider>
  </React.StrictMode>,
)