import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Prices from "./pages/Prices";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";

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
        path: 'about',
        element: <About />
    },
    {
        path: 'menu',
        element: <Menu />
    },
    {
        path: 'gallery',
        element: <Gallery />
    },
];

export default AppRoutes;