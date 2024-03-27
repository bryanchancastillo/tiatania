import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './scss/style.scss'
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.jsx";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthContextProvider>
        <ReactNotifications />
        <React.StrictMode>
           
            <BrowserRouter>
                
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </AuthContextProvider>
)
