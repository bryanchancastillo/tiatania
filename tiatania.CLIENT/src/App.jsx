import { Routes, Route } from "react-router-dom";
import AppRoutes from './AppRoutes.jsx'
import { useContext } from "react";
import { AuthContext } from "./context/authContext.jsx";


function App() {

    //const currentUser = useContext(AuthContext);
    
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