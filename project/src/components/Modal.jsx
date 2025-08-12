import PropTypes from "prop-types";

export default function Modal({ children, open }) {
    return open && <div className="modal-background">
        <div className="modal">
            {children}
        </div>
    </div>
}

Modal.propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool
};

export function ModalHeader({ children, onClose }) {
    return <div className="modal-header">
        <h3>{children}</h3>
        <button type="button" onClick={onClose}>X</button>
    </div>
}

ModalHeader.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};
