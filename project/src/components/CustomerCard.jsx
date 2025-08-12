import { memo } from "react";
import PropTypes from "prop-types";
import "./index.css"

function CustomerCard({
    customer,
    selected,
    onClick,
    onEdit
}) {
    return (<div className={"card " + (selected ? "selected" : "")} onClick={onClick}>
        <h4>{customer.id}</h4>
        <dl>
            <dt>Name:</dt>
            <dd>{customer.name}</dd>
            <dt>E-mail:</dt>
            <dd>{customer.email}</dd>
            <dt>Phone:</dt>
            <dd>{customer.phone}</dd>
            <dt>Job:</dt>
            <dd>{customer.jobTitle}</dd>
        </dl>
        <div>
            <button type="button" onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
            }}>Edit</button>
        </div>
    </div>)
}

CustomerCard.propTypes = {
    customer: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        jobTitle: PropTypes.string.isRequired
    }).isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default memo(CustomerCard);
