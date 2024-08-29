import "./index.css"

export default function CustomerCard({
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