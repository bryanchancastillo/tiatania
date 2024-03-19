import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function About() {
  return (
      <>
          <Navbar />

          <Header title="Sobre Nosotros" />

          <section className="py-7 py-md-9">
              <div className="container">
                  <div className="row align-items-center justify-content-between">
                      <div className="col-md-6 order-md-2">
                          <img className="img-fluid mw-md-120 clip-top-start" src="assets/img/about.jpg" alt="..." />
                      </div>
                      <div className="col-md-5 order-md-1">
                          <p className="lead text-black">
                              Experiencia de Servicio al Cliente
                          </p>
                          <p className="mb-6 ">
                              En nuestro motel, la satisfacci&oacute;n del cliente es nuestra m&aacute;xima prioridad. Nuestro dedicado equipo de servicio al cliente est&aacute; disponible las 24 horas para asegurarse de que su estancia sea c&oacute;moda, agradable y sin preocupaciones. Ya sea que necesite asistencia con el registro, informaci&oacute;n sobre nuestras comodidades o cualquier otro requerimiento, estamos aqu&iacute; para atenderlo con amabilidad y profesionalismo.
                              Su comodidad y tranquilidad son fundamentales para nosotros, y nos esforzamos por brindarle un servicio excepcional que haga de su visita una experiencia inolvidable.
                          </p>
                          <div className="d-flex">
                              <p className="mx-2">
                                  <a className="btn btn-outline-primary" href="tel:+18095376122"> LLamanos</a>
                              </p>
                              <p className="mx-2">
                                  <Link className="btn btn-outline-primary" to="/prices"> Precios</Link>
                              </p>


                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <Footer />
      </>
  );
}

export default About;