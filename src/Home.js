import {useState, useEffect} from "react";
import moment from "moment";
import useFetch from "./useFetch";
import DataTable from "./components/DataTable";
import { ToastContainer, toast } from 'react-toastify';
import {createColumnHelper} from "@tanstack/react-table";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://arraytic-backend.test:8000';
    const { loading, error, data: addressBooks, refetch  } = useFetch(`${apiBaseUrl}/api/address-book`, [apiBaseUrl]);
    const [refreshTable, setRefreshTable] = useState(false); // State variable to trigger re-render
    const [tableData, setTableData] = useState([]);
    const token = localStorage.getItem('token');
    // Update tableData whenever addressBooks changes
    useEffect(() => {
        setTableData(addressBooks);
    }, [addressBooks]);
    function getGender(cell){
        if (cell.getValue() === 0 ){
            return 'Male'
        }
        return 'Female'
    }
    const columnHelper = createColumnHelper();
    const columnDefWithFilter = [
        columnHelper.accessor("serialId", {
            header: "Serial",
            enableColumnFilter: false,
        }),

        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "email",
            header: "Email",

        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        // {
        //     accessorKey: "website",
        //     header: "Website",
        // },
        {
            accessorKey: "gender",
            header: "Gender",
            cell:getGender,
            enableColumnFilter: false,
        },
        {
            accessorKey: "age",
            header: "Age",
        },
        {
            accessorKey: "nationality",
            header: "Nationality",
            enableColumnFilter: false,
        },

        {
            accessorKey: "user.name",
            header: "Created By",
        },

        {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ getValue }) => moment(new Date(getValue())).format("MMM Do YY"),
            enableColumnFilter: false,
        },
        {
            accessor: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div>
                    <Link to={`/view/${row.original.id}`}>
                        <button>View</button>
                    </Link>
                    <Link to={`/edit/${row.original.id}`}>
                        <button>Edit</button>
                    </Link>

                    <button onClick={() => handleDelete(row)}>Delete</button>
                </div>
            ),
        },
    ];


    const handleDelete = async (row) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this item?");
        if (!shouldDelete) {
            return; // User canceled delete
        }
        try {
            const response = await fetch(
                `${apiBaseUrl}/api/address-book/${row.original.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': token ? `Bearer ${token}` : '',
                    },
                }
            );

            if (response) {
                const result = await response.json();
                await refetch(); // Trigger re-fetch and wait for it to complete
                setTableData(prevData => prevData.filter(item => item.id !== row.original.id));
                setRefreshTable(prevValue => !prevValue); // Toggle refreshTable state
                toast.success("Data Deleted successfully");
            } else {
                toast.error("Delete request failed");
            }
        } catch (error) {
            toast.error("Error deleting row");
        }
    };

    return (
        <div className="home">
            {error && <div><p>{error}</p></div>}
            {loading && <div><p>Loading...</p></div>}
            {tableData && <DataTable
                addressBooks={tableData}
                title={"Hello World Address"}
                columnDefWithFilter={columnDefWithFilter}
                key={refreshTable}
            />}
        </div>
    );
}

export default Home;