import React, {useState} from 'react';
import AddressBookForm from './components/AddressBookForm';
import {toast} from "react-toastify";

const Create = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://arraytic-backend.test:8000';
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
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
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Error submitting form');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <AddressBookForm onSubmit={onSubmit} />
            )}
        </div>
    );
};

export default Create;