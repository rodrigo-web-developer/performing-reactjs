const URL_API = "http://localhost:3000";

function getCustomers() {
    return fetch(`${URL_API}/customers`)
        .then(r => r.json());
}

export { getCustomers }