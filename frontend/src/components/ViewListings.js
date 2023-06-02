import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ListingCard from './ListingCard';

const ViewListings = (props) => {

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
            <div class="row d-flex justify-content-center">
                
                    <h1 className='col-md-4'>Listings</h1>
                    <button type="button" className='col-md-4 offset-md-4 btn btn-primary'>
                        <Link to='/create-listing'>Create Listing</Link>
                        Create Listing
                    </button>
                
                <div className="row">
                    {listingList}
                </div>
            </div>
    </div>
    )
    
}

export default ViewListings;