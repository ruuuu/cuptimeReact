import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'normalize.css'; // устанвоиил как npm i normalize.css --save
import './index.css';
import { ProductProvider } from './context/productContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductProvider> 
      <App />
    </ProductProvider>
  </React.StrictMode>,
)
