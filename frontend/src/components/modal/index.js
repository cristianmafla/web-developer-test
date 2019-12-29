import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function WindowModal(props) {
	const [ show, setShow ] = useState(false);

	const handleClose = () => {
		setShow(false)
		if(props.closeFunction){
			props.closeFunction();
		}
	};
	const handleShow = () => {
		setShow(true);
		if(props.openFunction){
			props.openFunction();
		}
	};

	return (
		<Fragment>
			<Button variant={props.variant || `dark`} size="sm" onClick={handleShow} className="btn_accion_cards">
				{props.btnOpen || `abrir modal`}
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{props.title || `titulo`}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.children}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}
