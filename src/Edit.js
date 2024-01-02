import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import AddressBookForm from "./components/AddressBookForm";

const Edit = () => {
    const { id } = useParams();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://arraytic-backend.test:8000';
    const [tableData, setTableData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${apiBaseUrl}/api/address-book/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
        })
            .then(response => response.json())
            .then(data => {
                setTableData(data.data);
            });
    }, [id]);
    const onSubmit = async (data) => {
        console.log(data); // Form data
        try {
            const response = await fetch(`${apiBaseUrl}/api/address-book/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Form Updated successfully');
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
        }
    };

    return (
        <div className="form-container">
            { tableData && <AddressBookForm
                onSubmit={onSubmit} initialData={tableData}/>
            }
        </div>
    );
};

export default Edit;
