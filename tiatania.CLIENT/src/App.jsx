import { Routes, Route } from "react-router-dom";
import AppRoutes from './AppRoutes.jsx'

function App() {
    
    return (
        <Routes>
            {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                return <Route key={index} sensitive={false} {...rest} element={element} />;
            })}
        </Routes>
    )
}

export default App