import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';

function App() {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); 
    }, [location.pathname]); 

    return (
        <Routes>
            {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                return <Route key={index} sensitive={false} {...rest} element={element} />;
            })}
        </Routes>
    );
}

export default App;
