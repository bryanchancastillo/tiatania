import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

const AppRoutes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '*',
        element: <PageNotFound />
    },
];

export default AppRoutes;