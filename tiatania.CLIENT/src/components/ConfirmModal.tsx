
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface ConfirmModalProps {
    entityId: string;
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
}

function ConfirmModal(props: ConfirmModalProps) {
    const [modal, setModal] = useState(true);

    const toggle = () => setModal(!modal);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={props.onCancel}>{props.title}</ModalHeader>
            <ModalBody>{props.message}</ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.onCancel}>
                    Cancel
                </Button>
                <Button color="danger" onClick={props.onConfirm}>
                    Confirm
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ConfirmModal;
