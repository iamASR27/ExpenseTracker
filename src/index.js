import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './store/auth-context';
import { Provider } from 'react-redux';
import store from './store/index';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);

