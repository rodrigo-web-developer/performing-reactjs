import { useContext, useMemo } from "react";
import { CustomersContext } from "../contexts";

export function CustomersProvider({ children, customers }) {
    const data = useMemo(() => ({
        customers: customers,
        eventEmitter: new EventTarget()
    }), []);

    function filterData(search) {
        data.eventEmitter.dispatchEvent(new CustomEvent("filter", {
            detail: search
        }))
    }

    return <CustomersContext.Provider value={{
        filterData: filterData,
        subscribe: (eventName, handler) => {
            data.eventEmitter.addEventListener(eventName, handler);
        },
        customers: data.customers
    }}>
        {children}
    </CustomersContext.Provider>
}

export const useCustomers = () => {
    const context = useContext(CustomersContext);
    return context;
}