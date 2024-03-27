import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { createPortal } from 'react-dom';
import ConfirmModal from './ConfirmModal';
import { MenuModalProps } from "../interfaces/MenuModalProps"
import { ReferenceMenuTypes } from "../interfaces/ReferenceMenuTypes"
import { renderNotificationsFromBackEnd } from '../misc/utils';
import { Store } from 'react-notifications-component';

function MenuModal({ isOpen, toggle, selectedMenuItemData, addNewItemToMenu, addUpdatedMenuItem, addDeletedMenuItem }: MenuModalProps) {

    const [referenceMenuTypes, setReferenceMenuTypes] = useState<ReferenceMenuTypes[]>([]);
    const [selectedMenuTypeId, setSelectedMenuTypeId] = useState<number | ''>('');
    const [selectedMenuName, setSelectedMenuName] = useState<string | ''>('');
    const [selectedMenuPrice, setSelectedMenuPrice] = useState<number | ''>('');
    const [selectedMenuFile, setSelectedMenuFile] = useState<File | ''>('');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState([]);

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

            if (validationErrors != null || validationErrors != '') {
                setValidationErrors([])
            }
        } 
           
    }, [isOpen]);

    async function populateMenuReferenceTypes() {
        const response = await fetch('/API/References/MenuTypes');
        const data = await response.json();
        setReferenceMenuTypes(data);
    }

    function handleOpenConfirmModal(){
        setShowConfirmModal(true);
    }

    function handleCloseConfirmModal() {
        setShowConfirmModal(false);
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
            setSelectedMenuFile('');
            setPreviewImage('');
        }
    }

    async function handleCreateMenuItem() {

        if (!selectedMenuTypeId || !selectedMenuName || !selectedMenuPrice || !imageName || !selectedMenuFile) {

            Store.addNotification({
                title: 'Error',
                message: 'Por favor complete todos los campos obligatorios.',
                type: 'danger',
                insert: 'top',
                container: 'top-right',
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
            return;
        }

        const formData = new FormData();
        formData.append('MenuTypeId', selectedMenuTypeId.toString());
        formData.append('Name', selectedMenuName);
        formData.append('Price', selectedMenuPrice.toString());
        formData.append('ImagePath', imageName);
        formData.append('File', selectedMenuFile);

        const response = await fetch("API/Menus/Create", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: formData,
        });

        const responseResult = await response.json();

        setValidationErrors(responseResult.errors);

        if (responseResult != null && responseResult.success && responseResult.menuId > 0) {
            addNewItemToMenu(responseResult);
            toggle();
            renderNotificationsFromBackEnd(responseResult);
        } else {
            renderNotificationsFromBackEnd(responseResult);
        }
    }


    async function handleUpdateMenuItem() {

        if (!selectedMenuName || !selectedMenuPrice) {

            Store.addNotification({
                title: 'Error',
                message: 'Por favor complete todos los campos obligatorios.',
                type: 'danger',
                insert: 'top',
                container: 'top-right',
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
            return;
        }

        const formData = new FormData();

        if (selectedMenuItemData && selectedMenuItemData.menuId !== undefined) {
            formData.append('MenuId', selectedMenuItemData.menuId.toString());
        }

        if (selectedMenuItemData && selectedMenuItemData.menuTypeId !== undefined) {
            formData.append('MenuTypeId', selectedMenuItemData.menuTypeId.toString());
        }

        formData.append('Name', selectedMenuName || '');
        formData.append('Price', selectedMenuPrice?.toString() || '');

        const response = await fetch('API/Menus/Update', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: formData,
        });

        const responseResult = await response.json();

        setValidationErrors(responseResult.errors);

        if (responseResult != null && responseResult.success && responseResult.menuId > 0) {
            addUpdatedMenuItem(responseResult)
            toggle();
            renderNotificationsFromBackEnd(responseResult);
        } else {
            renderNotificationsFromBackEnd(responseResult);
        }
        
    }

    async function handleDeleteMenuItem(menuId: number) {

        const formData = new FormData();

        if (selectedMenuItemData && selectedMenuItemData.menuId !== undefined) {
            formData.append('MenuId', selectedMenuItemData.menuId.toString());
        }

        const response = await fetch('API/Menus/Delete/' + menuId, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: formData,
        });

        const responseResult = await response.json();

        if (responseResult != null && responseResult.success) {
            handleCloseConfirmModal();
            toggle();
            addDeletedMenuItem(menuId)
            renderNotificationsFromBackEnd(responseResult);
        } else {
            renderNotificationsFromBackEnd(responseResult);
        }
       
    }

    function UpdateOrCreateMenuItem() {
        if (selectedMenuItemData && selectedMenuItemData.menuId !== undefined && selectedMenuItemData.menuId > 0) {
            handleUpdateMenuItem();
        } else {
            handleCreateMenuItem();
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{selectedMenuItemData && selectedMenuItemData.menuId > 0 ? 'Editar bebida' : 'Agregar bebida'}</ModalHeader>
                <ModalBody className={Array.from(validationErrors).length > 0 ? "modal-body was-validated" : "modal-body"}>
                    {selectedMenuItemData && selectedMenuItemData.menuTypeId > 0 ? null : (
                        <div className="col-12">
                            <label className="form-label">Tipo de bebida</label>
                            <div className="input-group mb-3">
                                <select className={Array.from(validationErrors).filter(v => v.key === "MenuTypeId").length > 0 ? "is-invalid form-select" : "form-select"} name="MenuTypeId" onChange={handleMenuTypeIdChange} required>
                                    <option value="">Selecciona tipo de bebida</option>
                                    {referenceMenuTypes.map((option, index) => (
                                        <option key={index} value={option.referenceId}>{option.code}</option>
                                    ))}
                                </select>
                                {Array.from(validationErrors).filter(v => v.key === "MenuTypeId").length > 0 && <div className="invalid-feedback"> {Array.from(validationErrors).filter(v => v.key === "MenuTypeId")[0].text}</div>}
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <div className="col-12">
                            <label className="form-label">Nombre</label>
                            <div className="input-group mb-3">
                                <input type="text" className={Array.from(validationErrors).filter(v => v.key === "Name").length > 0 ? "is-invalid form-control" : "form-control"} name="Name" required value={selectedMenuName} onChange={handleMenuNameChange} />
                                {Array.from(validationErrors).filter(v => v.key === "Name").length > 0 && <div className="invalid-feedback"> {Array.from(validationErrors).filter(v => v.key === "Name")[0].text}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label className="form-label">Precio</label>
                            <div className="input-group mb-3">
                                <input type="number" className={Array.from(validationErrors).filter(v => v.key === "Price").length > 0 ? "is-invalid form-control" : "form-control"} name="Price" required value={selectedMenuPrice} onChange={handleMenuPriceChange} />
                                {Array.from(validationErrors).filter(v => v.key === "Price").length > 0 && <div className="invalid-feedback"> {Array.from(validationErrors).filter(v => v.key === "Price")[0].text}</div>}
                            </div>
                        </div>
                    </div>
                    {selectedMenuItemData && selectedMenuItemData?.menuId > 0 ? null : (
                        <div className="row">
                            <div className="col-12">
                                <label className="form-label">Imagen</label>
                                <div className="input-group mb-3">
                                    <input type="file" className={Array.from(validationErrors).filter(v => v.key === "File").length > 0 ? "is-invalid form-control" : "form-control"} name="File" required onChange={handleImageChange} />
                                    {Array.from(validationErrors).filter(v => v.key === "File").length > 0 && <div className="invalid-feedback"> {Array.from(validationErrors).filter(v => v.key === "File")[0].text}</div>}
                                </div>
                                <div className="text-center">
                                    {previewImage && <img src={previewImage} alt="Preview" style={{ width: "110.5px", height: "110.5px" }} />}
                                </div>
                            </div>
                        </div>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                    {selectedMenuItemData && selectedMenuItemData?.menuId > 0 ? (
                        <Button color="danger" onClick={handleOpenConfirmModal}>
                        <i className="bi bi-trash3 mx-1"></i>
                            Eliminar
                        </Button>) : null
                    }
                    <Button color="primary" onClick={UpdateOrCreateMenuItem}>
                        Guardar
                    </Button>
                </ModalFooter>
            </Modal>
            {showConfirmModal && createPortal(
                <ConfirmModal
                    title="Confirmacion para borrar esta bebida"
                    message="Estas seguro de que quieres borrar esta bebida?"
                    onCancel={handleCloseConfirmModal}
                    onConfirm={() => {
                        if (selectedMenuItemData && selectedMenuItemData.menuId !== undefined) {
                            handleDeleteMenuItem(selectedMenuItemData.menuId);
                        }
                    }}
                />,
                document.body
            )}
        </div>


    );
}

export default MenuModal;
