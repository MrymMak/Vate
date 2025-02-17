import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css'; // Ant Design styles reset
import './App.css';          // Custom styles
import dotenv from 'dotenv';
dotenv.config();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);