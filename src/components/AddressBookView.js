// AddressBookView.js
import React from 'react';
import moment from "moment/moment";

const AddressBookView = ({ data }) => {
    return (
        <div>
            <h2>Address Book Details</h2>
            <p>Name: {data.name}</p>
            <p>Phone: {data.phone}</p>
            <p>Email: {data.email}</p>
            <p>Website: {data.website}</p>
            <p>Gender: {data.gender === '0' ? 'Male' : 'Female'}</p>
            <p>Age: {data.age}</p>
            <p>Nationality: {data.nationality}</p>
            <p>Created At: {moment(new Date(data.created_at)).format("MMM Do YY")}</p>
        </div>
    );
};

export default AddressBookView;
