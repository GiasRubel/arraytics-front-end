import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import AddressBookForm from './components/AddressBookForm';

const Edit = () => {
    const { id } = useParams();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://arraytic-backend.test:8000';
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchData();
    }, [id, apiBaseUrl, token]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiBaseUrl}/api/address-book/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                },
            });
            const data = await response.json();
            setTableData(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiBaseUrl}/api/address-book/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Form Updated successfully');
                fetchData();
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
                tableData && (
                    <AddressBookForm onSubmit={onSubmit} initialData={tableData}  />
                )
            )}
        </div>
    );
};

export default Edit;
