import React, { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ListingDetailView = (props) => {

    const { id } = useParams();

    const [listing, setListing] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8082/api/items/${id}`)
            .then(result => { console.log(result.data); setListing(result.data); })
            .catch(error => { console.log('error reading from API'); });
    }); 

    return(
        <div>
            <h1>{listing.title}</h1>
            <p>id:{id}</p>
        </div>
    );
}

export default ListingDetailView;