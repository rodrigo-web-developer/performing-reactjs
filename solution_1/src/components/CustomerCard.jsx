import { useEffect, useState } from "react";
import "./index.css"
import { useCustomers } from "../hooks";

export default function CustomerCard({
    customer,
    selected,
    onClick,
    onEdit
}) {
    const [hidden, setHidden] = useState(false);
    const { subscribe } = useCustomers();
    useEffect(() => {
        subscribe("filter", (e) => {
            const lowerSearch = e.detail.toLowerCase();
            const show = !e.detail
                || customer.name.toLowerCase().includes(lowerSearch)
                || customer.phone.includes(e.detail)
                || customer.email.toLowerCase().includes(lowerSearch);
            if (customer.visible !== show) {
                customer.visible = show;
                setHidden(!customer.visible);
            }
        })
    }, []);

    return (<div
        className={"card"
            + (selected ? " selected" : "")
            + (hidden ? " hidden" : "")}
        onClick={onClick}>
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