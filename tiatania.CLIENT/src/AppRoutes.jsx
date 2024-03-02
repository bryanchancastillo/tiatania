import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Prices from "./pages/Prices";

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
];

export default AppRoutes;