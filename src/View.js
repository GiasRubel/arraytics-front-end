import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import AddressBookView from './components/AddressBookView';

const View = () => {
    const { id } = useParams();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://arraytic-backend.test';
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/api/address-book/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token ? `Bearer ${token}` : '',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status}`);
                }

                const data = await response.json();
                setTableData(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, apiBaseUrl, token]);

    return (
        <div className="form-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                tableData && <AddressBookView data={tableData} />
            )}
        </div>
    );
};

export default View;
