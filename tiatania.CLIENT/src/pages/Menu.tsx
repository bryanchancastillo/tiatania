import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext }  from "../context/authContext.jsx";
import MenuModal from "../components/MenuModal.js";


function Menu() {

    interface MenuItem {
        menuId: number;
        menuTypeId: number;
        name: string;
        price: number;
        imagePath: string;
    }
    const currentUser = useContext(AuthContext);

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);

    function openMenuModal() {
        setMenuModalIsOpen(true);
    }

    function closeMenuModal() {
        setMenuModalIsOpen(false);
    }

    console.log(currentUser)

    useEffect(() => {
        populateMenuItems();
    }, []);

    console.log(menuItems)

    return (
        <>
            <Navbar />

            <Header title="Menu" />

            <div className="d-flex justify-content-end">
                <div className="inline-block bg-primary p-1 m-2" type="button" onClick={openMenuModal}>
                    <i className=" bi bi-patch-plus mx-1 text-dark "></i>
                </div>
            </div>

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
                                    cigarrillos
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
                    <div className="row">
                        <div className="col-12">

                            {/*Cervezas*/}
                            <div className="tab-content" id="menuContent">
                                <div className="tab-pane fade show active" id="mains" role="tabpanel" aria-labelledby="mainsTab">
                                    <div className="row">
                                        {menuItems.map((beer) => (
                                            <div className='col-12 col-md-6 mb-3' key={beer.name}>
                                                <div  >
                                                    <div className="row">
                                                        <div className="col-3 align-self-center">
                                                            {/*<!-- Image -->*/}
                                                            <div className="ratio ratio-1x1">
                                                                <img className="object-fit-cover" src={beer.imagePath} alt="..." />
                                                            </div>
                                                        </div>
                                                        <div className="col-6 align-self-center">
                                                            {/*<!-- Heading -->*/}
                                                            <h5 className="mb-2">{beer.name}</h5>
                                                     
                                                        </div>
                                                        <div className="col-1 align-self-center">
                                                            {/*<!-- Price -->*/}
                                                            <div className="fs-5 font-serif text-center text-black">
                                                                ${beer.price}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>                  
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <MenuModal isOpen={menuModalIsOpen} toggle={closeMenuModal} />
      

            <Footer />

       
        </>
    );

    async function populateMenuItems() {
        const response = await fetch('API/Menus');
        const data = await response.json();
        setMenuItems(data);
    }
}

export default Menu;