import {useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Navbar() {

    const navbar = useRef<HTMLDivElement>(null);
    const navbarCollapse = useRef<HTMLDivElement>(null);
    const navbarToggler = useRef<HTMLButtonElement>(null);

    const [isLight, setIsLight] = useState<boolean>(false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const location = useLocation();

    useEffect(() => {
        const windowEvents: string[] = ['load', 'scroll'];

        if (navbar.current && navbarCollapse.current) {
            // Toggle navbar on scroll
            windowEvents.forEach((event) => {
                window.addEventListener(event, toggleNavbar);
            });

            // Toggle navbar on expand
            navbarCollapse.current.addEventListener('show.bs.collapse', () => {
                setIsCollapsed(true);
                makeNavbarLight();
            });

            // Toggle navbar on collapse
            navbarCollapse.current.addEventListener('hidden.bs.collapse', () => {
                setIsCollapsed(false);
                if (!window.pageYOffset) {
                    makeNavbarDark();
                }
            });
        }

        return () => {
            windowEvents.forEach((event) => {
                window.removeEventListener(event, toggleNavbar);
            });

            if (navbarCollapse.current) {
                navbarCollapse.current.removeEventListener('show.bs.collapse', makeNavbarLight);
                navbarCollapse.current.removeEventListener('hidden.bs.collapse', makeNavbarDark);
            }
        };
    }, [isLight, isCollapsed]);

    return (
        <nav className="navbar navbar-dark navbar-expand-lg navbar-togglable fixed-top" ref={navbar}>
            <div className="container">
                <a className="navbar-brand d-lg-none" href="/">Tia Tania</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" ref={navbarToggler}  >
                    <i className="bi bi-list" style={{ fontSize: "1.7rem" }}></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse" ref={navbarCollapse}  >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} href="/about">Sobre nosotros</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${location.pathname === '/menu' ? 'active' : ''}`} href="/menu">Menu</a>
                        </li>
                    </ul>
                    <a className="navbar-brand d-none d-lg-flex mx-lg-auto" href="/">
                        Tia Tania
                    </a>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`} href="/gallery">Galeria</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${location.pathname === '/prices' ? 'active' : ''}`} href="/prices">Precios</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

    function makeNavbarDark() {
        if (navbar.current != null) {
            navbar.current.classList.remove('navbar-light');
            navbar.current.classList.add('navbar-dark');
            setIsLight(false);
        }
    }

    function makeNavbarLight() {
        if (navbar.current != null) {
            navbar.current.classList.remove('navbar-dark');
            navbar.current.classList.add('navbar-light');
            setIsLight(true);
        }
    }

    function toggleNavbar() {
        const scrollTop: number = window.pageYOffset;
        
        if (scrollTop && !isLight) {
            makeNavbarLight();
        }

        if (!scrollTop && !isCollapsed) {
            makeNavbarDark();
        }
    }
}

export default Navbar;