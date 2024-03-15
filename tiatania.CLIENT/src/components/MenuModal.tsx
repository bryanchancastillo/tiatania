import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface MenuModalProps {
    isOpen: boolean;
    toggle: () => void;
    addNewItemToMenu: () => void;
}

interface MenuItem {
    referenceId: number;
    code: string;
}

function MenuModal({ isOpen, toggle, addNewItemToMenu }: MenuModalProps) {
    const [referenceMenuTypes, setReferenceMenuTypes] = useState<MenuItem[]>([]);
    const [selectedMenuTypeId, setSelectedMenuTypeId] = useState<number | null>(null);
    const [selectedMenuName, setSelectedMenuName] = useState<string | null>(null);
    const [selectedMenuPrice, setSelectedMenuPrice] = useState<number | null>(null);
    const [selectedMenuFile, setSelectedMenuFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState(null);
 

    const imageName = selectedMenuFile ? selectedMenuFile.name : null;

    useEffect(() => {
        if (isOpen) {
            populateMenuReferenceTypes();
        } else {
            setSelectedMenuTypeId(null);
            setSelectedMenuName(null);
            setSelectedMenuPrice(null);
            setSelectedMenuFile(null);
            setPreviewImage(null);
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

    async function handleSaveButtonClick() {
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

            console.log(responseResult);

            if (responseResult.modal.menuId > 0) {
                toggle();
            }

            addNewItemToMenu(responseResult.modal);

            
        } catch (error) {
            console.error('Error creating menu item:', error);
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Agregar bebida</ModalHeader>
                <ModalBody>
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
                        <div className="row">
                            <div className="col-12">
                                <label className="form-label">Nombre</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" name="Name" onChange={handleMenuNameChange} />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label className="form-label">Precio</label>
                                <div className="input-group mb-3">
                                    <input type="number" className="form-control" name="Price" onChange={handleMenuPriceChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label className="form-label">Imagen</label>
                                <div className="input-group mb-3">
                                    <input type="file" className="form-control" name="File" onChange={handleImageChange} />
                                </div>
                            <div className="text-center">
                                {previewImage && <img src={previewImage} alt="Preview" style={{ width: "110.5px", height:"110.5px" }} />}
                                </div>
                            </div>
                        </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSaveButtonClick}>
                        Guardar
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default MenuModal;
