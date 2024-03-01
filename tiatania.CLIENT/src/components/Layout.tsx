import React from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutProps } from '../interfaces/LayoutProps';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';

function Layout(props: LayoutProps): React.ReactElement {
    
    const location = useLocation();
    const title = getTitleFromPath(location.pathname);

    return (
        <div>
            <Navbar />
            <Header title={title} />
            {props.children}
            <Footer />
        </div>
    );
}

function getTitleFromPath(path: string): string {
    switch (path) {
        case '/about':
            return 'Sobre Nosotros';
        case '/menu':
            return 'Menu';
        case '/gallery':
            return 'Galeria';
        case '/prices':
            return 'Precios';
        default:
            return '';
    }
}

export default Layout;
