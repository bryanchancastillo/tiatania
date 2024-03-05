import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './scss/style.scss'
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthContextProvider>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>,
    </AuthContextProvider>
)
