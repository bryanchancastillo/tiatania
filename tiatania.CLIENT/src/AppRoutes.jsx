import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Prices from "./pages/Prices";
import About from "./pages/About";

const AppRoutes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '*',
        element: <PageNotFound />
    },
    {
        path: 'prices',
        element: <Prices />
    },
    {
        path: 'About',
        element: <About />
    },
];

export default AppRoutes;