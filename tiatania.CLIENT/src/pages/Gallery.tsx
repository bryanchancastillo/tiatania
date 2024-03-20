import { useEffect } from 'react';
import Flickity from 'flickity';
import imagesLoaded from 'imagesloaded';
import Isotope from 'isotope-layout';
import BigPicture from 'bigpicture';
import 'flickity/css/flickity.css';
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

 interface BigPictureOptions {
    el: HTMLElement;
    noLoader: boolean;
}

 interface FlickityOptions {
    wrapAround: boolean;
    imagesLoaded: boolean;
}

interface IsotopeOptions {
    // Add Isotope options as needed
}

function Gallery() {

    function initializeFlickityCarousel() {
        const flickityOptions: FlickityOptions = {
            wrapAround: true,
            imagesLoaded: true,
        };
        const carousel = new Flickity('.carousel', flickityOptions);
        imagesLoaded('.carousel').on('progress', () => {
            carousel.reloadCells();
            carousel.resize();
        });
        return carousel;
    }

    function handleBigPictureClick(toggle: HTMLElement) {
        const elementOptions = JSON.parse(toggle.dataset.bigpicture || '{}');
        const defaultOptions: BigPictureOptions = {
            el: toggle,
            noLoader: true,
        };
        const options: BigPictureOptions = {
            ...defaultOptions,
            ...elementOptions,
        };
        BigPicture(options);
    }

    function cleanupFlickityCarousel(carousel: Flickity) {
        carousel.destroy();
    }

    function initializeIsotope(isotopeElement: HTMLElement) {
        imagesLoaded(isotopeElement, () => {
            const options: IsotopeOptions = isotopeElement.dataset.isotope
                ? JSON.parse(isotopeElement.dataset.isotope)
                : {};
            new Isotope(isotopeElement, options);
        });
    }

    useEffect(() => {
        // Initialize the Flickity carousel
        const carousel = initializeFlickityCarousel();

        // Get all elements with the attribute 'data-bigpicture'
        const toggles = document.querySelectorAll<HTMLElement>('[data-bigpicture]');

        // Add click event to each element to expand image using BigPicture
        toggles.forEach((toggle) => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                handleBigPictureClick(toggle);
            });
        });

        // Clean up the Flickity carousel when the component is unmounted
        return () => {
            cleanupFlickityCarousel(carousel);
        };

    }, []);

    // Initialize Isotope on mount
    useEffect(() => {
        const isotopeElements = document.querySelectorAll<HTMLElement>('[data-isotope]');
        isotopeElements.forEach((isotopeElement) => {
            initializeIsotope(isotopeElement);
        });
    }, []);


    return (
        <>
            <Navbar></Navbar>

            <Header title="Galeria"></Header>

            <section className="pt-5 pt-md-7 mb-7">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="carousel">
                                <figure className="w-100">
                                    <img className="img-fluid mb-4" src="../assets/img/43.jpeg" alt="..." />
                                    <figcaption className="text-center">#43 🥰</figcaption>
                                </figure>
                                <figure className="w-100">
                                    <img className="img-fluid mb-4" src="../assets/img/44.jpeg" alt="..." />
                                    <figcaption className="text-center">#44 🥰</figcaption>
                                </figure>
                                <figure className="w-100">
                                    <img className="img-fluid mb-4" src="../assets/img/7.jpeg" alt="..." />
                                    <figcaption className="text-center">#7 🥰</figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-7 py-md-9">
                <div className="container">
                    <div className="row gx-3" data-isotope>
                        <div className="col-6 col-sm-6 col-md-4">
                            <a className="d-block mb-3" href="#" data-bigpicture='{ "imgSrc": "assets/img/7.jpeg" }'>
                                <img className="img-fluid" src="assets/img/7.jpeg" alt="..." />
                            </a>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4">
                            <a className="d-block mb-3" href="#" data-bigpicture='{ "imgSrc": "assets/img/12.jpeg" }'>
                                <img className="img-fluid" src="assets/img/12.jpeg" alt="..." />
                            </a>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4">
                            <a className="d-block mb-3" href="#" data-bigpicture='{ "imgSrc": "assets/img/19.jpeg" }'>
                                <img className="img-fluid" src="assets/img/19.jpeg" alt="..." />
                            </a>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4">
                            <a className="d-block mb-3" href="#" data-bigpicture='{ "imgSrc": "assets/img/40.jpg" }'>
                                <img className="img-fluid" src="assets/img/40.jpg" alt="..." />
                            </a>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4">
                            <a className="d-block mb-3" href="#" data-bigpicture='{ "imgSrc": "assets/img/43.jpeg" }'>
                                <img className="img-fluid" src="assets/img/43.jpeg" alt="..." />
                            </a>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4">
                            <a className="d-block mb-3" href="#" data-bigpicture='{ "imgSrc": "assets/img/44.jpeg" }'>
                                <img className="img-fluid" src="assets/img/44.jpeg" alt="..." />
                            </a>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4">
                            <a className="d-block mb-3" href="#" data-bigpicture='{ "imgSrc": "assets/img/47.jpeg" }'>
                                <img className="img-fluid" src="assets/img/47.jpeg" alt="..." />
                            </a>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4">
                            <a className="d-block mb-3" href="#" data-bigpicture='{ "imgSrc": "assets/img/6.png" }'>
                                <img className="img-fluid" src="assets/img/6.png" alt="..." />
                            </a>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4">
                            <a className="d-block mb-3" href="#" data-bigpicture='{ "imgSrc": "assets/img/35.jpeg" }'>
                                <img className="img-fluid" src="assets/img/35.jpeg" alt="..." />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer></Footer>

        </>
    );
}

export default Gallery;