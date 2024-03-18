import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface MenuModalProps {
    isOpen: boolean;
    toggle: () => void;
    addNewItemToMenu: () => void;
    selectedMenuItemData?: any;
    addUpdatedMenuItem: any;

}

interface MenuItem {
    referenceId: number;
    code: string;
}

function MenuModal({ isOpen, toggle, addNewItemToMenu, selectedMenuItemData, addUpdatedMenuItem }: MenuModalProps) {
    const [referenceMenuTypes, setReferenceMenuTypes] = useState<MenuItem[]>([]);
    const [selectedMenuTypeId, setSelectedMenuTypeId] = useState<number | ''>('');
    const [selectedMenuName, setSelectedMenuName] = useState<string | ''>('');
    const [selectedMenuPrice, setSelectedMenuPrice] = useState<number | ''>('');
    const [selectedMenuFile, setSelectedMenuFile] = useState<File | ''>('');
    const [previewImage, setPreviewImage] = useState(null);

    const imageName = selectedMenuFile ? selectedMenuFile.name : null;

    useEffect(() => {
        
        if (isOpen) {
            populateMenuReferenceTypes();

            if (selectedMenuItemData?.name && selectedMenuItemData?.price != null) {
                setSelectedMenuName(selectedMenuItemData?.name);
                setSelectedMenuPrice(selectedMenuItemData?.price);
            } else {
                setSelectedMenuName('');
                setSelectedMenuPrice('');
                setSelectedMenuTypeId('')
                setSelectedMenuFile('')
                setPreviewImage(null);
            }
   
        } 
           
    }, [isOpen]);


    async function populateMenuReferenceTypes() {
        try {
            const response = await fetch('/API/References/MenuTypes');
            const data = await response.json();
            setReferenceMenuTypes(data);
        } catch (error) {
            console.error('Error fetching menu types:', error);
        }
    }

    function handleMenuTypeIdChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedMenuTypeId(Number(e.target.value));
    }

    function handleMenuNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSelectedMenuName(e.target.value);
    }

    function handleMenuPriceChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSelectedMenuPrice(Number(e.target.value));
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedMenuFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedMenuFile(null);
            setPreviewImage(null);
        }
    }

    async function handleCreateMenuItem() {
        const formData = new FormData();

        formData.append('MenuTypeId', selectedMenuTypeId.toString());
        formData.append('Name', selectedMenuName || '');
        formData.append('Price', selectedMenuPrice?.toString() || '');
        formData.append('ImagePath', imageName || ''); // Append imageName correctly
        formData.append('File', selectedMenuFile || '');

        try {
            const response = await fetch("API/Menus/Create", {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                body: formData,
            });

            const responseResult = await response.json();

           // console.log(responseResult);

            if (responseResult.modal.menuId > 0) {
                toggle();
            }

            addNewItemToMenu(responseResult?.modal);

            
        } catch (error) {
            console.error('Error creating menu item:', error);
        }
    }

    async function handleUpdateMenuItem() {

        const formData = new FormData();
        formData.append('MenuId', selectedMenuItemData?.menuId.toString());
        formData.append('MenuTypeId', selectedMenuItemData?.menuTypeId.toString());
        formData.append('Name', selectedMenuName || '');
        formData.append('Price', selectedMenuPrice?.toString() || '');

        const response = await fetch('API/Menus/Update', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: formData,
        });

        const dataFromServer = await response.json();

        // console.log(dataFromServer)

        if (dataFromServer?.message?.indexOf("Successfully") > -1) {
            addUpdatedMenuItem(dataFromServer?.modal)
            toggle();
        }

        if (dataFromServer.model == null) {
            console.log(dataFromServer);
        }

    }

    function UpdateOrCreateMenuItem() {
        if (selectedMenuItemData?.menuId > 0) {
            handleUpdateMenuItem();
        }
        else {
            handleCreateMenuItem();
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{selectedMenuItemData && selectedMenuItemData.menuId > 0 ? 'Editar bebida' : 'Agregar bebida'}</ModalHeader>
                <ModalBody>

                    {selectedMenuItemData && selectedMenuItemData.menuTypeId > 0 ? null : (
                        <div className="col-12">
                            <label className="form-label">Tipo de bebida</label>
                            <div className="input-group mb-3">
                                <select className="form-select" name="MenuTypeId" onChange={handleMenuTypeIdChange}>
                                    <option value="">Selecciona tipo de bebida</option>
                                    {referenceMenuTypes.map((option, index) => (
                                        <option key={index} value={option.referenceId}>{option.code}</option>
                                    ))}
                                </select>
                            </div>
                        </div>        
                    )}

                    <div className="row">
                        <div className="col-12">
                            <label className="form-label">Nombre</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" name="Name" value={selectedMenuName} onChange={handleMenuNameChange} />

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label className="form-label">Precio</label>
                            <div className="input-group mb-3">
                                <input type="number" className="form-control" name="Price" value={selectedMenuPrice} onChange={handleMenuPriceChange} />
                            </div>
                        </div>
                    </div>
                    {selectedMenuItemData && selectedMenuItemData?.menuId > 0 ? null : (
                        <div className="row">
                            <div className="col-12">
                                <label className="form-label">Imagen</label>
                                <div className="input-group mb-3">
                                    <input type="file" className="form-control" name="File"  onChange={handleImageChange} />
                                </div>
                                <div className="text-center">
                                    {previewImage && <img src={previewImage} alt="Preview" style={{ width: "110.5px", height: "110.5px" }} />}
                                </div>
                            </div>
                        </div>
                    )}
             
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={UpdateOrCreateMenuItem}>
                        Guardar
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default MenuModal;
