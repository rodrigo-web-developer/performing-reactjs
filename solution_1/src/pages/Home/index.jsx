import { useEffect, useRef, useState } from "react";
import { getCustomers } from "../../services";
import "./index.css";
import CustomerCard from "../../components/CustomerCard";
import Modal, { ModalHeader } from "../../components/Modal";
import { CustomersProvider, useCustomers } from "../../hooks";

export default function Home() {
    const [data, setData] = useState();

    const fetchData = async () => {
        const res = await getCustomers();
        setData(res);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return data ? (
        <CustomersProvider customers={data}>
            <InnerHome></InnerHome>
        </CustomersProvider>
    ) : <></>;
}

function InnerHome() {

    const [customer, setCustomer] = useState();
    const [ascending, setAscending] = useState();
    const [selected, setSelected] = useState([]);

    const clearSelected = () => {
        data.forEach(x => x.selected = false);
        setSelected(() => []);
    }

    const { filterData, customers } = useCustomers();

    return (<main className="container">
        <div className="row">
            <input onChange={(e) => filterData(e.target.value)}
                type="search"
                placeholder="Search by name, email or phone" />
                
            <button className={ascending ? "active" : ""} onClick={() => setAscending(true)} type="button">A-Z</button>
            <button className={ascending === false ? "active" : ""} onClick={() => setAscending(false)} type="button">Z-A</button>
            <span>Total: {selected.length}</span>

            {selected.length > 0 && <button onClick={clearSelected} type="button">Clear</button>}
        </div>
        <div className="grid">
            {customers.map(x =>
                <CustomerCard
                    key={x.id}
                    selected={x.selected}
                    onClick={() => toggleSelected(x)}
                    onEdit={() => setCustomer(x)} customer={x}></CustomerCard>
            )}
        </div>
        <Modal open={!!customer}>
            <ModalHeader onClose={() => setCustomer(undefined)}>Edit Customer</ModalHeader>
            <InnerForm data={customer}></InnerForm>
        </Modal>
    </main>)
}

function InnerForm({ data }) {
    const [name, setName] = useState(data.name);
    const [phone, setPhone] = useState(data.phone);
    const [email, setEmail] = useState(data.email);
    const [job, setJob] = useState(data.jobTitle);

    return <form className="form">
        <label>Name:</label>
        <input value={name}></input>
        <label>E-mail:</label>
        <input value={email}></input>
        <label>Phone:</label>
        <input value={phone}></input>
        <label>Job title:</label>
        <input value={job}></input>
    </form>
}
