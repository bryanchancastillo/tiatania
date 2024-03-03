import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

function Menu() {
    return (
        <>
            <Navbar />

            <Header title="Menu" />

            <section className="py-7 py-md-9 border-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="nav justify-content-center mb-6" id="menuTabs" role="tablist">
                                <a className="nav-link active mb-3" id="mainsTab" data-bs-toggle="tab" href="#mains" role="tab" aria-controls="mains" aria-selected="true">
                                    Cervezas
                                </a>
                                <a className="nav-link mb-3" id="licoresTab" data-bs-toggle="tab" href="#licores" role="tab" aria-controls="licores">
                                    Licores
                                </a>
                                <a className="nav-link mb-3" id="vinosTab" data-bs-toggle="tab" href="#vinos" role="tab" aria-controls="vinos">
                                    vinos
                                </a>
                                <a className="nav-link mb-3" id="bebidasTab" data-bs-toggle="tab" href="#bebidas" role="tab" aria-controls="bebidas">
                                    Bebidas
                                </a>
                                <a className="nav-link mb-3" id="tabacosTab" data-bs-toggle="tab" href="#tabacos" role="tab" aria-controls="tabacos">
                                    Cigarrillos
                                </a>
                                <a className="nav-link mb-3" id="picaderasTab" data-bs-toggle="tab" href="#picaderas" role="tab" aria-controls="picaderas">
                                    snacks
                                </a>
                                <a className="nav-link mb-3" id="bienestarTab" data-bs-toggle="tab" href="#bienestar" role="tab" aria-controls="bienestar">
                                    Cuidado personal
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Menu;