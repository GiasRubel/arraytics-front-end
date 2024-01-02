import React from 'react';
import AddressBookForm from './components/AddressBookForm';
import {toast} from "react-toastify";

const Create = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://arraytic-backend.test:8000';
    const token = localStorage.getItem('token');
    const onSubmit = async (data) => {
        const response = await fetch(`${apiBaseUrl}/api/address-book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();

        if (response.ok) {
            toast.success('Data Created successfully');
        } else if (result.errors) {
            for (const field in result.errors) {
                for (const problem of result.errors[field]) {
                    toast.error(problem);
                }
            }
        }

    };

    return <AddressBookForm onSubmit={onSubmit} />;
};

export default Create;