import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { getCustomers } from "../../services";
import "./index.css";
import CustomerCard from "../../components/CustomerCard";
import Modal, { ModalHeader } from "../../components/Modal";

export default function Home() {
    const [data, setData] = useState();
    const [search, setSearch] = useState("");
    const [customer, setCustomer] = useState();
    const [ascending, setAscending] = useState();
    const [selectedCount, setSelectedCount] = useState(0);
    const selectedIdsRef = useRef(new Set());

    const fetchData = async () => {
        const res = await getCustomers();
        setData(res);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const filteredAndSortedData = useMemo(() => {
        if (!data) return [];
        
        let resultData = data;
        
        if (search) {
            const lowerSearch = search.toLowerCase();
            resultData = data.filter(
                x => x.name.toLowerCase().includes(lowerSearch)
                    || x.phone.includes(search)
                    || x.email.toLowerCase().includes(lowerSearch)
            );
        }
        
        if (ascending !== undefined) {
            resultData = [...resultData].sort(
                (a, b) => ascending ?
                    (a.name > b.name ? 1 : -1) :
                    (a.name > b.name ? -1 : 1)
            );
        }
        
        return resultData;
    }, [data, search, ascending]);

    const toggleSelected = useCallback((customerId, isSelected) => {
        if (isSelected) {
            selectedIdsRef.current.add(customerId);
        } else {
            selectedIdsRef.current.delete(customerId);
        }
        setSelectedCount(selectedIdsRef.current.size);
    }, []);

    const clearSelected = useCallback(() => {
        selectedIdsRef.current.clear();
        setSelectedCount(0);
        window.dispatchEvent(new CustomEvent('clearSelection'));
    }, []);

    const handleSearchChange = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    const handleSortAscending = useCallback(() => {
        setAscending(true);
    }, []);

    const handleSortDescending = useCallback(() => {
        setAscending(false);
    }, []);

    const handleEditCustomer = useCallback((customer) => {
        setCustomer(customer);
    }, []);

    const handleCloseModal = useCallback(() => {
        setCustomer(undefined);
    }, []);

    return data ? (
        <main className="container">
            <div className="row">
                <input 
                    value={search} 
                    onChange={handleSearchChange} 
                    type="search" 
                    placeholder="Search by name, email or phone" 
                />
                <button 
                    className={ascending ? "active" : ""} 
                    onClick={handleSortAscending} 
                    type="button"
                >
                    A-Z
                </button>
                <button 
                    className={ascending === false ? "active" : ""} 
                    onClick={handleSortDescending} 
                    type="button"
                >
                    Z-A
                </button>
                <span>Total: {selectedCount}</span>

                {selectedCount > 0 && (
                    <button onClick={clearSelected} type="button">Clear</button>
                )}
            </div>
            <div className="grid">
                {filteredAndSortedData.map(customer =>
                    <CustomerCard
                        key={customer.id}
                        customer={customer}
                        onSelectionChange={toggleSelected}
                        onEdit={() => handleEditCustomer(customer)}
                    />
                )}
            </div>
            <Modal open={!!customer}>
                <ModalHeader onClose={handleCloseModal}>Edit Customer</ModalHeader>
                <InnerForm data={customer} />
            </Modal>
        </main>
    ) : <></>;
}

function InnerForm({ data }) {
    const [name, setName] = useState(data?.name || "");
    const [phone, setPhone] = useState(data?.phone || "");
    const [email, setEmail] = useState(data?.email || "");
    const [job, setJob] = useState(data?.jobTitle || "");

    useEffect(() => {
        if (data) {
            setName(data.name || "");
            setPhone(data.phone || "");
            setEmail(data.email || "");
            setJob(data.jobTitle || "");
        }
    }, [data]);

    return <form className="form">
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <label>E-mail:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Phone:</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label>Job title:</label>
        <input value={job} onChange={(e) => setJob(e.target.value)} />
    </form>
}

InnerForm.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
        jobTitle: PropTypes.string
    })
};
