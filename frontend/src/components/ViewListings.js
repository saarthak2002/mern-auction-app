import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import ListingCard from './ListingCard';

const ViewListings = (props) => {

    const { state } = useLocation();
    console.log(state);

    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:8082/api/items')
        .then( result => {
            setListings(result.data);
        })
        .catch( error => {
            console.log('error reading from API');
        });
    }, []);

    console.log('hi')
    console.log(listings);

    const listingList = 
        listings.length === 0 
        ? 'There are no listings yet!'
        : listings.map((listing, k) => <ListingCard listing={listing} key={k} />);

    return(
        <div className="container">
            <div className="row d-flex justify-content-center">
                
                    <h1 className='col-md-4'>Listings</h1>
                    
                        <Link to='/create-listing' className='col-md-4 offset-md-4 btn btn-primary'>Create Listing</Link>
                        {state ?  <p> {state.firstName }</p> : <p>Not logged in</p>}
                
                <div className="row">
                    {listingList}
                </div>
            </div>
    </div>
    )
    
}

export default ViewListings;