
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface MenuModalProps {
    isOpen: boolean;
    toggle: () => void;
}

function MenuModal({ isOpen, toggle }: MenuModalProps) {
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Agregar bebida</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="row">
                            <div className="col-12">
                                <label className="form-label">
                                    AGREGA EL TIPO DE BEBIDA
                                </label>
                                <div className="input-group mb-3">
                             

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label className="form-label">
                                    NOMBRE
                                </label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label className="form-label">
                                    PRECIO
                                </label>
                                <div className="input-group mb-3">
                                    <input type="text"  className="form-control datepicker" />
                                </div>
                            </div>
                        </div>
                 
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        guardar
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default MenuModal;