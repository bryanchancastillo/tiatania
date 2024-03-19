import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext }  from "../context/authContext.jsx";
import MenuModal from "../components/MenuModal.js";
const basePath = '../public/assets/img/';


interface MenuItem {
    menuId: number;
    menuTypeId: number;
    name: string;
    price: number;
    imagePath: string;
}
function Menu() {

    //const currentUser = useContext(AuthContext);

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
    const [selectedDrink, setSelectedDrink] = useState<number[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [showTotalPrice, setShowTotalPrice] = useState<boolean>(false);
    const [drinkQuantities, setDrinkQuantities] = useState<{ [key: number]: number }>({});
    const [selectedMenuItemData, setSelectedMenuItemData] = useState<MenuItem | null>(null);
    const [activeTab, setActiveTab] = useState<string>('cervezas');

    const selectedMenuTypeId = selectedDrink[selectedDrink.length - 1];

    function openMenuModal() {
        setMenuModalIsOpen(true);
    }

    function closeMenuModal() {
        setMenuModalIsOpen(false);
        setSelectedMenuItemData(null);
    }


    function addedNewItemToMenu(newMenuItem: MenuItem) {
        setMenuItems(prevMenuItems => [...prevMenuItems, newMenuItem]);
    }

    function addedUpdatedMenuItem(addedUpdatedMenuItem) {

        // Find the index of the updated menu item in the menuItems array
        const itemIndex = menuItems.findIndex(item => item.menuId === addedUpdatedMenuItem.menuId);

        // If the updated menu item is found in the menuItems array, update its name and price
        if (itemIndex !== -1) {
            const updatedMenuItems = [...menuItems];
            updatedMenuItems[itemIndex].name = addedUpdatedMenuItem.name;
            updatedMenuItems[itemIndex].price = addedUpdatedMenuItem.price;
            setMenuItems(updatedMenuItems); // Update the state with the updated menu items
        } else {
            // If the updated menu item is not found in the menuItems array, add it
            setMenuItems([...menuItems, addedUpdatedMenuItem]); // Add the new menu item to the end of the array
       
        }

        // Optionally, perform any other actions needed after updating the menu items
    }

    function addedDeletedMenuItem(menuIdToDelete) {
        // Filter out the menu item with the specified menuIdToDelete
        const updatedMenuItems = menuItems.filter(item => item.menuId !== menuIdToDelete);
        setMenuItems(updatedMenuItems); // Update the state with the filtered menu items

        // Optionally, perform any other actions needed after deleting the menu item
    }

    function toggleDrinkSelection(drink: MenuItem) {
        // Function to toggle the selection of a beer

        // Add the name of the current beer to the list of selected beers
        setSelectedDrink([...selectedDrink, drink.menuId]);

        // Update the total price by adding the price of the current beer
        setTotalPrice(totalPrice + drink.price);

        // Create a copy of the existing beer quantities object
        const newQuantities = { ...drinkQuantities };

        // Check if the current beer is already in the quantities object
        if (newQuantities[drink.menuId]) {
            // If yes, increment its quantity by 1
            newQuantities[drink.menuId]++;
        } else {
            // If not, set its quantity to 1
            newQuantities[drink.menuId] = 1;
        }

        // Update the beer quantities object with the new quantities
        setDrinkQuantities(newQuantities);
    }

    function subtractDrink(event: React.MouseEvent, drink: MenuItem) {

        event.stopPropagation(); // Stop the event propagation

        // Get the quantity of this beer from the drinkQuantities object, or 0 if it doesn't exist
        const beerQuantity = drinkQuantities[drink.menuId] || 0;

        // Calculate the subtotal of this beer by multiplying its price with the quantity
        const beerSubtotal = drink.price * beerQuantity;

        // Subtract the subtotal from the overall total to update the new total price
        const newTotalPrice = totalPrice - beerSubtotal;
        setTotalPrice(newTotalPrice);

        // Filter the list of selected beers to remove the current beer
        const newSelectedDrink = selectedDrink.filter(menuId => menuId !== drink.menuId);
        setSelectedDrink(newSelectedDrink);

        // Create a copy of the drinkQuantities object and set the quantity of this beer to 0
        const newQuantities = { ...drinkQuantities };
        if (newQuantities[drink.menuId]) {
            newQuantities[drink.menuId] = 0;
            setDrinkQuantities(newQuantities);
        }
    }

    async function populateMenuItems() {
        const response = await fetch('API/Menus');
        const data = await response.json();
        setMenuItems(data);
    }

    async function handleUpdateMenu(event: React.MouseEvent) {

        event.stopPropagation();

        const response = await fetch('/API/Menus/' + selectedMenuTypeId, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: { id: recruitmentEffortId } // body data type must match "Content-Type" header);
        });

        const responseResult = await response.json();

        if (responseResult != null) {
            setSelectedMenuItemData(responseResult);
            openMenuModal();
        }

        setSelectedDrink([]);
        setDrinkQuantities({});
        setTotalPrice(0);
    }

    function renderMenuItems(menuTypeId: number) {
        return menuItems
            .filter((item) => item.menuTypeId === menuTypeId)
            .map((item) => (
                <div className="col-12 col-md-6 mb-3" key={item.menuId}>
                    <div
                        className={`py-3 ${selectedDrink.includes(item.menuId) ? 'custom-border' : ''}`}
                        onClick={() => toggleDrinkSelection(item)}
                    >
                        <div className="row">
                            <div className="col-3 align-self-center">
                                <div className="ratio ratio-1x1">
                                    <img
                                        className="object-fit-cover"
                                        src={basePath + item.imagePath}
                                        alt="..."
                                    />
                                </div>
                            </div>
                            <div className="col-6 align-self-center">
                                <h5 className="mb-2">{item.name}</h5>
                                <div className="d-flex">
                                    {drinkQuantities[item.menuId] > 0 && (
                                        <p className="mb-0">
                                            Cantidad: <span>{drinkQuantities[item.menuId] || 0}</span>
                                        </p>
                                    )}
                                    {selectedDrink.includes(item.menuId) && (
                                        <div className="mx-1">
                                            <i
                                                className="bi bi-x-circle-fill text-danger"
                                                onClick={(e) => subtractDrink(e, item)}
                                                type="button"
                                            ></i>
                                            <i
                                                className="bi bi-pencil-square mx-2 text-black"
                                                onClick={handleUpdateMenu}
                                                type="button"
                                            ></i>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-1 align-self-center">
                                <div className="fs-5 font-serif text-center text-black">
                                    ${item.price}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ));
    }

    useEffect(() => {
        populateMenuItems();
    }, []);

    useEffect(() => {
        setShowTotalPrice(totalPrice > 0);
    }, [totalPrice]);

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
                                <a
                                    className={`nav-link ${activeTab === 'cervezas' ? 'active' : ''} mb-3`}
                                    id="cervezasTab"
                                    onClick={() => setActiveTab('cervezas')}
                                    role="tab"
                                    aria-controls="cervezas"
                                >
                                    Cervezas
                                </a>
                                <a
                                    className={`nav-link ${activeTab === 'licores' ? 'active' : ''} mb-3`}
                                    id="licoresTab"
                                    onClick={() => setActiveTab('licores')}
                                    role="tab"
                                    aria-controls="licores"
                                >
                                    Licores
                                </a>
                                <a
                                    className={`nav-link ${activeTab === 'vinos' ? 'active' : ''} mb-3`}
                                    id="vinosTab"
                                    onClick={() => setActiveTab('vinos')}
                                    role="tab"
                                    aria-controls="vinos"
                                >
                                    Vinos
                                </a>
                                <a
                                    className={`nav-link ${activeTab === 'bebidas' ? 'active' : ''} mb-3`}
                                    id="bebidasTab"
                                    onClick={() => setActiveTab('bebidas')}
                                    role="tab"
                                    aria-controls="bebidas"
                                >
                                    Bebidas
                                </a>
                                <a
                                    className={`nav-link ${activeTab === 'cigarrillos' ? 'active' : ''} mb-3`}
                                    id="cigarillosTab"
                                    onClick={() => setActiveTab('cigarrillos')}
                                    role="tab"
                                    aria-controls="cigarrillos"
                                >
                                    Cigarrillos
                                </a>
                                <a
                                    className={`nav-link ${activeTab === 'snacks' ? 'active' : ''} mb-3`}
                                    id="snacksTab"
                                    onClick={() => setActiveTab('snacks')}
                                    role="tab"
                                    aria-controls="snacks"
                                >
                                    snacks
                                </a>
                                <a
                                    className={`nav-link ${activeTab === 'bienestar' ? 'active' : ''} mb-3`}
                                    id="bienestarTab"
                                    onClick={() => setActiveTab('bienestar')}
                                    role="tab"
                                    aria-controls="bienestar"
                                >
                                    Cuidado Personal
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="tab-content" id="menuContent">
                                <div
                                    className={`tab-pane fade show ${activeTab === 'cervezas' ? 'active' : ''}`}
                                    id="cervezas"
                                    role="tabpanel"
                                    aria-labelledby="cervezasTab"
                                >
                                    <div className="row">{renderMenuItems(1)}</div>
                                </div>
                                <div
                                    className={`tab-pane fade show ${activeTab === 'licores' ? 'active' : ''}`}
                                    id="licores"
                                    role="tabpanel"
                                    aria-labelledby="licoresTab"
                                >
                                    <div className="row">{renderMenuItems(2)}</div>
                                </div>
                                <div
                                    className={`tab-pane fade show ${activeTab === 'vinos' ? 'active' : ''}`}
                                    id="vinos"
                                    role="tabpanel"
                                    aria-labelledby="vinosTab"
                                >
                                    <div className="row">{renderMenuItems(3)}</div>
                                </div>
                                <div
                                    className={`tab-pane fade show ${activeTab === 'bebidas' ? 'active' : ''}`}
                                    id="bebidas"
                                    role="tabpanel"
                                    aria-labelledby="bebidasTab"
                                >
                                    <div className="row">{renderMenuItems(4)}</div>
                                </div>
                                <div
                                    className={`tab-pane fade show ${activeTab === 'cigarrillos' ? 'active' : ''}`}
                                    id="cigarrillos"
                                    role="tabpanel"
                                    aria-labelledby="cigarrillosTab"
                                >
                                    <div className="row">{renderMenuItems(5)}</div>
                                </div>
                                <div
                                    className={`tab-pane fade show ${activeTab === 'snacks' ? 'active' : ''}`}
                                    id="snacks"
                                    role="tabpanel"
                                    aria-labelledby="snacksTab"
                                >
                                    <div className="row">{renderMenuItems(6)}</div>
                                </div>
                                <div
                                    className={`tab-pane fade show ${activeTab === 'bienestar' ? 'active' : ''}`}
                                    id="bienestar"
                                    role="tabpanel"
                                    aria-labelledby="bienestarTab"
                                >
                                    <div className="row">{renderMenuItems(7)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showTotalPrice && (
                <div className="totalprice d-flex justify-content-center fixed-bottom bg-primary p-3">
                    <div>{`TOTAL RD$${totalPrice.toFixed(2)}`}</div>
                </div>
            )}

            <Footer />

            <MenuModal isOpen={menuModalIsOpen} toggle={closeMenuModal} selectedMenuItemData={selectedMenuItemData} addNewItemToMenu={addedNewItemToMenu} addUpdatedMenuItem={addedUpdatedMenuItem} addDeletedMenuItem={addedDeletedMenuItem} />

        </>
    );

}

export default Menu;