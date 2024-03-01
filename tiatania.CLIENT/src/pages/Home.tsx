import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
function Home() {

    return (
        <>
            <Navbar />

            <header className="bg-cover" style={{ backgroundImage: "url(assets/img/home.jpg)" }}>
                <div className="d-flex flex-column min-vh-100 bg-black-50 pt-10 pt-md-8 pb-7 pb-md-0">
                    <div className="container my-auto">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6 text-center">
                                <h6 className="text-xs text-white-75 mb-4">
                                    <span className="text-primary">Motel</span> / ocio
                                </h6>
                                <h1 className="tiatanialogo display-1 mb-4">
                                   Tia Tania
                                </h1>
                                <a className="btn btn-outline-primary text-white text-primary-hover mb-7 mb-md-0" href="/menu"> Menu</a>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md">
                                <ul className="list-inline text-center text-md-start mb-3 my-md-5">
                                    <li className="list-inline-item ms-5">
                                        <a className="text-white-75 text-primary-hover" href="https://www.instagram.com/cabanastiatania/">
                                            <i className="bi bi-instagram"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item ms-5">
                                        <a className="text-white-75 text-primary-hover" href="https://www.facebook.com/cabanastiatania">
                                            <i className="bi bi-facebook"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item ms-5">
                                        <a className="text-white-75 text-primary-hover" href="https://api.whatsapp.com/send?phone=18498819396">
                                            <i className="bi bi-whatsapp"></i>
                                        </a>
                                    </li>
                                </ul>

                            </div>
                            <div className="col-md">
                                <a style={{ textDecoration: 'none' }} href="https://www.google.com/maps/place/Caba%C3%B1as+Tia+Tania/@18.4242891,-69.9920031,15z/data=!4m6!3m5!1s0x8ea56107ec23aeef:0xf1982ccf3e5e2e21!8m2!3d18.4242891!4d-69.9920031!16s%2Fg%2F11c0rnbr8k?entry=ttu">
                                    <p className="font-serif text-white-75 text-center text-md-end text-lg-end my-md-5 text-primary-hover" >
                                        <i className="bi bi-geo-alt mx-1"></i>  Autop. 30 de Mayo, Santo Domingo, Rep&uacute;blica Dominicana
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Footer />
        </>
  );
}

export default Home;